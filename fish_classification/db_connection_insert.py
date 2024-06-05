import pymysql as my
import base64
import json
# 어항 물고기 길이 변경 관련 모듈

def db_processing(user_id, fish_id, fish_act_length, img_path):
    row        = None # 쿼리 결과
    connection = None
    result = None
    img_flag = False
    fish_id = fish_id + 1 # 인덱스를 1부터로 조정

    try:
    
        connection = my.connect(host    ='i10c104.p.ssafy.io', 
                            user        ='root',        #DB ID      
                            password    ='fubao82493',      
                            database    ='fubao',
                            cursorclass = my.cursors.DictCursor #딕셔너리로 받기위한 커서
                            )

        cursor = connection.cursor()
        # cursor2 = connection.cursor()
        
        # with open(img_path, 'rb') as file:
        #     binaryData = file.read()

        # encoded_str = base64.b64encode(binaryData)
        # decoded_str = encoded_str.decode('UTF-8')

        img_save_name = "fish_image_" + str(user_id) + "_" + str(fish_id) + ".jpg"

        sql = '''
        SELECT
            * 
        FROM
            fish_user_fish 
        WHERE 
            user_id=%s
        AND 
            fish_id=%s;
            
        '''
        cursor.execute(sql, (user_id, fish_id)) # 커리 실행
        row = cursor.fetchone()

        if row['count'] == 0: # 처음 잡은 물고기일 때
            print("1번")
            sql_i = '''
            INSERT INTO fish_user_fish ( max_length, count, image, preference, latest_length ) VALUES ( %s, %s, %s, %s, %s );
            '''
            sql_u = '''
            UPDATE fish_user_fish SET max_length = %s, count = %s WHERE user_id = %s AND fish_id = %s;
            '''

            cursor.execute(sql_i, (fish_act_length, 1, img_save_name, row['preference'], fish_act_length))
            # connection.commit()
            
            cursor.execute(sql_u, (fish_act_length, 1, user_id, fish_id))
            connection.commit()
            
            img_flag = True

        else: # 기존에 잡아봤던 물고기일 때
            cur_cnt = row['count'] + 1

            if row['max_length'] == 0: # 기존 물고기의 길이가 없을 때
                sql_i = '''
                INSERT INTO fish_user_fish ( max_length, count, image, preference, latest_length ) VALUES ( %s, %s, %s, %s, %s );
                '''
                sql_u = '''
                UPDATE fish_user_fish SET max_length = %s, count = %s WHERE user_id = %s AND fish_id = %s;
                '''

                cursor.execute(sql_i, (fish_act_length, cur_cnt, img_save_name, row['preference'], fish_act_length))
                # connection.commit()

                cursor.execute(sql_u, (fish_act_length, cur_cnt, user_id, fish_id))
                connection.commit()

                img_flag = True
                print("2번")
            elif row['max_length'] < fish_act_length: # 현재 잡은 물고기 길이가 기존의 물고기 최고 길이보다 길 때
                sql_i = '''
                INSERT INTO fish_user_fish ( max_length, count, image, preference, latest_length ) VALUES ( %s, %s, %s, %s, %s );
                '''
                sql_u = '''
                UPDATE fish_user_fish SET max_length = %s, count = %s WHERE user_id = %s AND fish_id = %s;
                '''

                cursor.execute(sql_i, (fish_act_length, cur_cnt, img_save_name, row['preference'], fish_act_length))
                # connection.commit()

                cursor.execute(sql_u, (fish_act_length, cur_cnt, user_id, fish_id))
                connection.commit()

                img_flag = True
                print("3번")
            else: # 현재 잡은 물고기 길이가 기존의 물고기 최고 길이보다 길지 않을 때
                sql_i = '''
                INSERT INTO fish_user_fish ( max_length, count, preference, latest_length ) VALUES ( %s, %s, %s, %s );
                '''
                sql_u = '''
                UPDATE fish_user_fish SET count = %s WHERE user_id = %s AND fish_id = %s;
                '''

                cursor.execute(sql_i, (row['max_length'], cur_cnt, row['preference'], fish_act_length))
                # connection.commit()

                cursor.execute(sql_u, (cur_cnt, user_id, fish_id))
                connection.commit()
                print("4번")

    except Exception as e:
        print('접속오류', e)
    finally:
        if connection:      
          connection.close()          
        print('종료')
    # 결과를 리턴한다.
    return img_flag

def db_processing_no_obj(user_id, fish_id):
    row        = None # 쿼리 결과
    connection = None
    fish_id = fish_id + 1 # 인덱스를 1부터로 조정
    try:
    
        connection = my.connect(host    ='i10c104.p.ssafy.io',   #루프백주소, 자기자신주소
                            user        ='root',        #DB ID      
                            password    ='fubao82493',        # 사용자가 지정한 비밀번호
                            database    ='fubao',
                            cursorclass = my.cursors.DictCursor #딕셔너리로 받기위한 커서
                            )

        cursor = connection.cursor()

        sql = '''
        SELECT
            * 
        FROM
            fish_user_fish 
        WHERE 
            user_id=%s
        AND 
            fish_id=%s;
            
        '''
        cursor.execute(sql, (user_id, fish_id)) # 커리 실행
        row = cursor.fetchone()

        if row['count'] == 0: # 처음 잡은 물고기일 때
            sql_i = '''
            INSERT INTO fish_user_fish ( count, preference ) VALUES ( %s, %s );
            '''
            sql_u = '''
            UPDATE fish_user_fish SET count = 1 WHERE user_id = %s AND fish_id = %s;
            '''

            cursor.execute(sql_i, (1, row['preference']))
            # connection.commit()

            cursor.execute(sql_u, (user_id, fish_id))
            connection.commit()
            print("5번")
        else: # 기존에 잡아봤던 물고기일 때
            cur_cnt = row['count'] + 1
            
            sql_i = '''
            INSERT INTO fish_user_fish ( max_length, count, preference ) VALUES ( %s, %s, %s );
            '''
            sql_u = '''
            UPDATE fish_user_fish SET count = %s WHERE user_id = %s AND fish_id = %s;
            '''

            cursor.execute(sql_i, (row['max_length'], cur_cnt, row['preference']))
            # connection.commit()

            cursor.execute(sql_u, (cur_cnt, user_id, fish_id))
            connection.commit()
            print("6번")

    except Exception as e:
        print('접속오류', e)
    finally:
        if connection:      
          connection.close()          
        print('종료')
    # 결과를 리턴한다.


if __name__ == '__main__':
    # 테스트
    row = db_processing(1, 3, 14, './image.jpg')
    print('쿼리조회결과 : ', row)
    
    row = db_processing(2, 2, 11, './image.jpg')
    print('쿼리조회결과 : ', row)