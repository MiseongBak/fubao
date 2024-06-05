from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import urllib.request
from urllib.parse import urlparse
import base64
import requests
import os


chrome_options = webdriver.ChromeOptions()
chrome_options.binary = './chromedriver.exe' # 드라이버 실행파일 경로
chrome_options.add_argument('--ignore-certificate-errors-spki-list')
chrome_options.add_argument('--ignore-ssl-errors')
chrome_options.add_experimental_option('excludeSwitches', ['enable-logging'])

query = '놀래미' #검색어
label = 'greenling' #파일명

driver = webdriver.Chrome(options=chrome_options)
driver.get(f'https://www.google.com/imghp')
search_bar = driver.find_element(By.NAME,"q")
search_bar.send_keys(query)
search_bar.submit()

PAUSE_TIME = 2
#last_hegiht = driver.execute_script("return document.body.scrollHeight")
#new_height = 0


def selenium_scroll_option():
  SCROLL_PAUSE_SEC = 3
  
  # 스크롤 높이 가져옴
  last_height = driver.execute_script("return document.body.scrollHeight")
  
  while True:
    # 끝까지 스크롤 다운
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

    # 1초 대기
    time.sleep(SCROLL_PAUSE_SEC)

    # 스크롤 다운 후 스크롤 높이 다시 가져옴
    new_height = driver.execute_script("return document.body.scrollHeight")
  
    if new_height == last_height:
        break
    last_height = new_height

    try:
        # '더보기' 버튼이 보이면 클릭
        load_more_button = driver.find_element(By.XPATH, '//*[@id="islmp"]/div/div/div/div/div[1]/div[2]/div[2]/input')
        if load_more_button.is_displayed():
            load_more_button.click()
    except:
        pass
        
selenium_scroll_option() # 스크롤하여 이미지를 많이 확보
# driver.find_elements_by_xpath('//*[@id="islmp"]/div/div/div/div/div[1]/div[2]/div[2]/input')[0].click() # 이미지 더보기 클릭
# selenium_scroll_option()

img_elements = driver.find_elements(By.CSS_SELECTOR,".rg_i")
imgs = []

for idx, img in enumerate(img_elements) :
    print(f"{query} : {idx+1}/{len(img_elements)} proceed...")
    try :
        img.click()
        time.sleep(PAUSE_TIME)
        # 이부분에서 에러나면, 직접 개발자 도구 활용해서 XPATH 추출한 뒤에 변경
        # img_element = driver.find_element(By.XPATH,'//*[@id="Sva75c"]/div[2]/div[2]/div[2]/div[2]/c-wiz/div/div/div/div/div[3]/div[1]/a/img')
        img_element = driver.find_element(By.XPATH,'//*[@id="Sva75c"]/div[2]/div[2]/div[2]/div[2]/c-wiz/div/div/div/div/div[3]/div[1]/a/img[1]')
        img_src = img_element.get_attribute('src')
        img_alt = img_element.get_attribute('alt')
        imgs.append({
            'alt' : img_alt,
            'src' : img_src
        })
        
    except :
        print(f'err in {idx}')
        pass

driver.close()

save_path = f'.\\imgs\\{label}'
import os
if not os.path.exists(save_path):
    os.mkdir(save_path)

total_N = len(imgs)

def is_base64_url(url):
    return url.startswith('data:image')

def save_base64_image(data_url, save_path, label, idx):
    header, encoded = data_url.split(",", 1)
    data = base64.b64decode(encoded)
    with open(os.path.join(save_path, "{}_{}.png".format(label, idx)), "wb") as file:
        file.write(data)

for idx, one in enumerate(imgs):
    src = one['src']
    alt = one['alt']
    headers = {'User-Agent': 'Mozilla/5.0 ...'}

    try:
        if is_base64_url(src):
            save_base64_image(src, save_path, label, idx)
        else:
            response = requests.get(src, headers=headers)
            if response.status_code == 200:
                with open(os.path.join(save_path, "{}_{}.png".format(label, idx)), 'wb') as file:
                    file.write(response.content)
                    print(f"{idx+1}번째 파일 저장 완료")
            else:
                print(f"{alt} 다운로드 실패: HTTP 상태 {response.status_code}")
    except Exception as e:
        print(f"다운로드 중 오류 발생: {e}")

print('완료')