import scrapy
import requests
import os
import json 
from bs4 import BeautifulSoup

## Scraping Data from dogtime.com
class DogBreedScrap(scrapy.Spider):
    name = "dog_breed_scrap"

    base_url = "https://dogtime.com/dog-breeds/"

    def start_requests(self):
        with open('./DataScrap/spiders/breeds-list.txt', 'r') as breeds:
            for current_breed in breeds:
                url = self.base_url + current_breed
                yield scrapy.Request(url = url, callback = self.parse, meta = {
                    'current_breed': current_breed
                })

    def parse(self, response):
        detail = response.css('div.breeds-single-intro>p')[0].get()
        detail = BeautifulSoup(detail, 'lxml').text

        characteristics_dic = {}

        characteristics_dic['details'] = detail

        for characteristics in response.css('div.breed-characteristics-ratings-wrapper'):
            characteristics_name = characteristics.css('h3.characteristic-title::text').get()
            characteristic_details_dic = {}

            for characteristic in characteristics.css('div.child-characteristic'):
                characteristic_name = characteristic.css('div.characteristic-title::text').get()
                characteristic_stars = characteristic.css('div.characteristic-star-block>div.star::text').get()
                characteristic_details_dic[characteristic_name] = characteristic_stars
                
            characteristics_dic[characteristics_name] = characteristic_details_dic


        vital_stats_dic = {}
        for vital_stat in response.css('div.breed-vital-stats-wrapper>div.vital-stat-box'):
            vital_str = BeautifulSoup(vital_stat.get(), 'lxml').text

            vital_str_split = vital_str.split(":")
            vital_key = vital_str_split[0]
            vital_value = vital_str_split[1]

            vital_stats_dic[vital_key] = vital_value

        characteristics_dic['vitalStats'] = vital_stats_dic

        # print(json.dumps(characteristics_dic))

        filename = './../{}.json'.format(response.meta.get('current_breed'))
        with open(filename, 'w+') as f:
            f.write(json.dumps(characteristics_dic))

            print('[+] {} metadata created.'.format(response.meta.get('current_breed')))
