import requests
from bs4 import BeautifulSoup
import time

def fetch_elo():
    url = f"https://faceitstats.com/player/Bobbalu"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    #selector = "#app > main > div > div > div:nth-child(1) > div > h2 > strong:nth-child(2)"
    selector = "#app > main > div > div.row.no-gutters > div.col-sm-9.col-md-9.col-lg-10 > div:nth-child(1) > div > div:nth-child(1) > h5"
    element = soup.select_one(selector)
    if element:
        element_text = element.get_text()
        return f"{element_text}"
    else:
        return f"Element not found"


print(fetch_elo())