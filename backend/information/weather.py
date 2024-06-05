from datetime import datetime
import json, requests
from datetime import timedelta

from my_settings import WEATHER_API_KEY

# Create your views here.
import math
NX = 149            ## X축 격자점 수
NY = 253            ## Y축 격자점 수

Re = 6371.00877     ##  지도반경
grid = 5.0          ##  격자간격 (km)
slat1 = 30.0        ##  표준위도 1
slat2 = 60.0        ##  표준위도 2
olon = 126.0        ##  기준점 경도
olat = 38.0         ##  기준점 위도
xo = 210 / grid     ##  기준점 X좌표
yo = 675 / grid     ##  기준점 Y좌표
first = 0

if first == 0 :
    PI = math.asin(1.0) * 2.0
    DEGRAD = PI/ 180.0
    RADDEG = 180.0 / PI


    re = Re / grid
    slat1 = slat1 * DEGRAD
    slat2 = slat2 * DEGRAD
    olon = olon * DEGRAD
    olat = olat * DEGRAD

    sn = math.tan(PI * 0.25 + slat2 * 0.5) / math.tan(PI * 0.25 + slat1 * 0.5)
    sn = math.log(math.cos(slat1) / math.cos(slat2)) / math.log(sn)
    sf = math.tan(PI * 0.25 + slat1 * 0.5)
    sf = math.pow(sf, sn) * math.cos(slat1) / sn
    ro = math.tan(PI * 0.25 + olat * 0.5)
    ro = re * sf / math.pow(ro, sn)
    first = 1
    
# #시분초->위도 경도로 바꾸기 
# def make_grid(clat, clon):
#     lat_result=clat.split("-")
#     lat=int(lat_result[0])+float(lat_result[1])/60+float(lat_result[2][:-2])/3600
    
#     lon_result=clon.split("-")
#     lon=int(lon_result[0])+float(lon_result[1])/60+float(lon_result[2][:-2])/3600
    
#     return round(lat,7),round(lon,7)

#위도 경도를 x,y로 바꾸기
def map_to_grid(lat, lon, code = 0 ):
    
    ra = math.tan(PI * 0.25 + lat * DEGRAD * 0.5)
    ra = re * sf / pow(ra, sn)
    theta = lon * DEGRAD - olon
    if theta > PI :
        theta -= 2.0 * PI
    if theta < -PI :
        theta += 2.0 * PI
    theta *= sn
    x = (ra * math.sin(theta)) + xo
    y = (ro - ra * math.cos(theta)) + yo
    x = int(x + 1.5)
    y = int(y + 1.5)
    return x, y
  
nowData={}

temp=list()
winddir=list()
windvec=list()
sky=list()
pop=list()
wave=list()
pcp=list()

def weatherAPI(lat,lon):
#1. 실제 위도 경도로 바꾸고(도분초->위도경도), 2. 위도 경도를 x,y로 바꾸기 
    x,y= map_to_grid(float(lat),float(lon))
        
    #현재날짜로 설정 
    now = datetime.now().date()
    today=str(now).replace('-','')

    #현재 시간과 가까운 시간을 기준으로 설정
    time=["0200","0500","0800","1100","1400","1700","2000","2300"]
    nowTime=datetime.now()
    idx=(nowTime.hour+1)//3-1
    if nowTime.hour==0 or nowTime.hour==1:
        today=str(now- timedelta(days=1)).replace('-','')

        if nowTime==1:
            idx=0
    nowHour=time[idx]

    #api url
    url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst'
    params ={'serviceKey' : WEATHER_API_KEY, 'pageNo' : '1', 'numOfRows' : '1000', 'dataType' : 'JSON', 'base_date' : today, 'base_time' : nowHour, 'nx' : x, 'ny' : y }

    response = requests.get(url, params=params)
    dictionay=json.loads(response.content)
        
    for item in dictionay['response']['body']['items']['item']:
    
        if len(pcp)>=6:
            continue
            
        if item['category']=="TMP":
            temp.append({"fcstTime":item['fcstTime'],
                             "fsctValue":item["fcstValue"]})
                # temp[item['fcstTime']]=item["fcstValue"]
                
        if item['category']=="VEC":
            winddir.append({"fcstTime":item['fcstTime'],
                             "fsctValue":item["fcstValue"]})
                
        if item['category']=="WSD":
            windvec.append({"fcstTime":item['fcstTime'],
                             "fsctValue":item["fcstValue"]})
            
        if item['category']=="SKY":
            sky.append({"fcstTime":item['fcstTime'],
                             "fsctValue":item["fcstValue"]})
                
        if item['category']=="POP":
            pop.append({"fcstTime":item['fcstTime'],
                             "fsctValue":item["fcstValue"]})
                
        if item['category']=="WAV":
            wave.append({"fcstTime":item['fcstTime'],
                             "fsctValue":item["fcstValue"]})
                
        if item['category']=="PCP":
            pcp.append({"fcstTime":item['fcstTime'],
                             "fsctValue":item["fcstValue"]})   
            
    nowData["TMP"]=temp
    nowData["VEC"]=winddir
    nowData["WSD"]=windvec
    nowData["SKY"]=sky
    nowData["POP"]=pop
    nowData["WAV"]=wave
    nowData["PCP"]=pcp
    return nowData