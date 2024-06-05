#낚시 방법  import 
LOAD DATA LOW_PRIORITY LOCAL INFILE '/var/mariadb_home/csv_data/method.csv' 
REPLACE INTO TABLE `fubao`.`information_fishing_method` 
CHARACTER SET euckr FIELDS TERMINATED BY ',' 
OPTIONALLY ENCLOSED BY '"' ESCAPED BY '"' 
LINES TERMINATED BY '\r\n' 
IGNORE 1 LINES (`id`, `title`, `subtitle`,`document`);

#낚시 구역 import 
LOAD DATA LOW_PRIORITY LOCAL INFILE '/var/mariadb_home/csv_data/area.csv' 
REPLACE INTO TABLE `fubao`.`information_fishing_area` 
CHARACTER SET euckr FIELDS TERMINATED BY ',' 
OPTIONALLY ENCLOSED BY '"' ESCAPED BY '"' 
LINES TERMINATED BY '\r\n' 
IGNORE 1 LINES (`id`, `title`, `subtitle`,`document`);

#낚시 미끼 import
LOAD DATA LOW_PRIORITY LOCAL INFILE '/var/mariadb_home/csv_data/FishingBait.csv' 
REPLACE INTO TABLE `fubao`.`information_fishing_bait` 
CHARACTER SET euckr FIELDS TERMINATED BY ',' 
OPTIONALLY ENCLOSED BY '"' ESCAPED BY '"' 
LINES TERMINATED BY '\r\n' 
IGNORE 1 LINES (`id`, `title`, `document`);

#방생기준 import 
LOAD DATA LOW_PRIORITY LOCAL INFILE '/var/mariadb_home/csv_data/releaseFish.csv' 
REPLACE INTO TABLE `fubao`.`information_release_fish` 
CHARACTER SET euckr FIELDS TERMINATED BY ',' 
OPTIONALLY ENCLOSED BY '"' ESCAPED BY '"' 
LINES TERMINATED BY '\r\n' 
IGNORE 1 LINES (`id`, `name_kor`,`name_eng`,`standard`);

#금어기  import 
LOAD DATA LOW_PRIORITY LOCAL INFILE '/var/mariadb_home/csv_data/prohibitFish.csv' 
REPLACE INTO TABLE `fubao`.`information_prohibit_fish` 
CHARACTER SET euckr FIELDS TERMINATED BY ',' 
OPTIONALLY ENCLOSED BY '"' ESCAPED BY '"' 
LINES TERMINATED BY '\r\n' 
IGNORE 1 LINES (`id`, `name_kor`,`name_eng`,@standard_start,@standard_end)
SET `standard_start`=STR_TO_DATE(@standard_start,'%m-%d'),
`standard_end`=STR_TO_DATE(@standard_end,'%m-%d');

#어종 import 
LOAD DATA LOW_PRIORITY LOCAL INFILE '/var/mariadb_home/csv_data/Fish.CSV' 
REPLACE INTO TABLE `fubao`.`fish_fish` 
CHARACTER SET euckr FIELDS TERMINATED BY ',' 
OPTIONALLY ENCLOSED BY '"' ESCAPED BY '"' 
LINES TERMINATED BY '\r\n' 
IGNORE 1 LINES (`id`, `name_kor`, `name_eng`, `fish_difficulty`, `prohibit_id`, `release_standard_id`, `subtitle`, `document`);

#어종-area import 
LOAD DATA LOW_PRIORITY LOCAL INFILE '/var/mariadb_home/csv_data/fish_fish_area_id.CSV' 
REPLACE INTO TABLE `fubao`.`fish_fish_area` 
CHARACTER SET euckr FIELDS TERMINATED BY ',' 
OPTIONALLY ENCLOSED BY '"' ESCAPED BY '"' 
LINES TERMINATED BY '\r\n' 
IGNORE 1 LINES (`id`, `fish_id`, `fishing_area_id`);

#어종-bait import 
LOAD DATA LOW_PRIORITY LOCAL INFILE '/var/mariadb_home/csv_data/fish_fish_bait_id.CSV' 
REPLACE INTO TABLE `fubao`.`fish_fish_bait` 
CHARACTER SET euckr FIELDS TERMINATED BY ',' 
OPTIONALLY ENCLOSED BY '"' ESCAPED BY '"' 
LINES TERMINATED BY '\r\n' 
IGNORE 1 LINES (`id`, `fish_id`, `fishing_bait_id`);

#어종-method import 
LOAD DATA LOW_PRIORITY LOCAL INFILE '/var/mariadb_home/csv_data/fish_method.csv' 
REPLACE INTO TABLE `fubao`.`fish_fish_method` 
CHARACTER SET euckr FIELDS TERMINATED BY ',' 
OPTIONALLY ENCLOSED BY '"' ESCAPED BY '"' 
LINES TERMINATED BY '\r\n' 
IGNORE 1 LINES (`id`, `fish_id`, `fishing_method_id`);

#location map import
LOAD DATA LOW_PRIORITY LOCAL INFILE '/var/mariadb_home/csv_data/location_map.csv' 
REPLACE INTO TABLE `fubao`.`location_location` 
CHARACTER SET euckr FIELDS TERMINATED BY ',' 
OPTIONALLY ENCLOSED BY '"' ESCAPED BY '"' 
LINES TERMINATED BY '\r\n' 
IGNORE 1 LINES (`id`, `name`, `address`, `lattitude`,`longitude`);

#location-method import
LOAD DATA LOW_PRIORITY LOCAL INFILE '/var/mariadb_home/csv_data/location_method.csv' 
REPLACE INTO TABLE `fubao`.`location_location_method` 
CHARACTER SET euckr FIELDS TERMINATED BY ',' 
OPTIONALLY ENCLOSED BY '"' ESCAPED BY '"' 
LINES TERMINATED BY '\r\n' 
IGNORE 1 LINES (`id`, `location_id`,`fishing_method_id`);

#location-fish import
LOAD DATA LOW_PRIORITY LOCAL INFILE '/var/mariadb_home/csv_data/location_fish.csv' 
REPLACE INTO TABLE `fubao`.`location_location_fish` 
CHARACTER SET euckr FIELDS TERMINATED BY ',' 
OPTIONALLY ENCLOSED BY '"' ESCAPED BY '"' 
LINES TERMINATED BY '\r\n' 
IGNORE 1 LINES (`id`, `location_id`,`fish_id`);
