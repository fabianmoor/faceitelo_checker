import sys
import requests
from bs4 import BeautifulSoup

def fetch_elo(x):
    url = f"https://faceitelo.net/player/{x}"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    selector = "#app > main > div > div > div:nth-child(1) > div > h2 > strong:nth-child(2)"
    element = soup.select_one(selector)
    if element:
        element_text = element.get_text()
        return f"{element_text}"
    else:
        return "Element not found"

if len(sys.argv) > 1:
    username = sys.argv[1]
    if username != 'undefined':
        elo = fetch_elo(username)
        print(elo)
    else:
        print("No valid username provided")
else:
    print("No username provided")
