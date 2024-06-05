from math import pi, sin, cos, tan, acos, asin, atan, atan2
from datetime import datetime
import time

HH = 0
MM = 1

SUN_DIAMETER = 0.53
AIR_REF = (34.0/60.0)


def is_leap_year(year):
    if year % 4 == 0 and year % 100 == 0 and year % 400 != 0:
        return False
    elif year % 4 == 0 and year % 100 != 0:
        return True
    elif year % 4 == 0 and year % 100 == 0 and year % 400 == 0:
        return True
    else:
        return False


def get_julian_day(year, month, day):
    tmp = -7.0 * (float(year) + (float(month) + 9.0) / 12.0) / \
        4.0 + 275.0 * float(month) / 9.0 + float(day)
    tmp += float(year * 367)
    return (tmp - 730531.5 + 12.0 / 24.0)


def get_range_radian(x):
    b = float(x / (2*pi))
    a = float((2*pi) * (b - int(b)))

    if a < 0:
        a = (2*pi) + a
    return a


def get_ha(lat, decl):
    dfo = pi/180.0 * (0.5 * SUN_DIAMETER + AIR_REF)
    if lat < 0.0:
        dfo = -dfo
    fo = tan(decl + dfo) * tan(lat * pi / 180.0)
    if fo > 1.0:
        fo = 1.0
    fo = asin(fo) + pi / 2.0

    return fo


def get_sun_longitude(days):
    longitude = get_range_radian(
        280.461 * pi / 180.0 + 0.9856474 * pi/180.0 * days)
    g = get_range_radian(357.528 * pi/180.0 + 0.9856003 * pi/180.0 * days)

    return get_range_radian(longitude + 1.915 * pi/180.0 * sin(g) + 0.02 * pi/180.0 * sin(2*g)), longitude


def convert_dtime_to_rtime(dhour):
    hour = int(dhour)
    minute = int((dhour - hour) * 60)

    return hour, minute


def calculate_sunset_sunrise(latitude, longitude, timezone):
    today = datetime.today()

    days = get_julian_day(today.year, today.month, today.day)
    gamma, mean_longitude = get_sun_longitude(days)
    obliq = 23.439 * pi/180.0 - 0.0000004 * pi/180.0 * days

    alpha = atan2(cos(obliq)*sin(gamma), cos(gamma))
    delta = asin(sin(obliq)*sin(gamma))

    ll = mean_longitude - alpha

    if mean_longitude < pi:
        ll += (2*pi)
    eq = 1440.0 * (1.0 - ll / (2*pi))

    ha = get_ha(latitude, delta)

    sunrise = 12.0 - 12.0 * ha/pi + timezone - longitude/15.0 + eq/60.0
    sunset = 12.0 + 12.0 * ha/pi + timezone - longitude/15.0 + eq/60.0

    if sunrise > 24.0:
        sunrise -= 24.0
    if sunset > 24.0:
        sunset -= 24.0

    sunrise_time = [0, 0]
    sunset_time = [0, 0]

    sunrise_time[HH], sunrise_time[MM] = convert_dtime_to_rtime(sunrise)
    sunset_time[HH], sunset_time[MM] = convert_dtime_to_rtime(sunset)

    ret_sunrise, ret_sunset = "", ""

    if sunrise_time[HH] < 10:
        ret_sunrise += "0"
    ret_sunrise += str(sunrise_time[HH])
    ret_sunrise += ":"
    if sunrise_time[MM] < 10:
        ret_sunrise += "0"
    ret_sunrise += str(sunrise_time[MM]-1)

    if sunset_time[HH] < 10:
        ret_sunset += "0"
    ret_sunset += str(sunset_time[HH])
    ret_sunset += ":"
    if sunset_time[MM] < 10:
        ret_sunset += "0"
    ret_sunset += str(sunset_time[MM]+1)

    return ret_sunrise, ret_sunset

# def makeGrid(clat, clon):
    # lat_result=clat.split("-")
    # lat=int(lat_result[0])+float(lat_result[1])/60+float(lat_result[2][:-2])/3600
    
    # lon_result=clon.split("-")
    # lon=int(lon_result[0])+float(lon_result[1])/60+float(lon_result[2][:-2])/3600
    
    # return round(lat,7),round(lon,7)

def sunsetAPI(clan, clon):
    # lan,lon=makeGrid(clan,clon)
    
    sunrise, sunset = calculate_sunset_sunrise(float(clan), float(clon), 9)
    
    return sunrise,sunset