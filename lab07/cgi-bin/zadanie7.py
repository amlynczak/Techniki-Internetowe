#!/usr/bin/env python3
import cgi
import json

form = cgi.FieldStorage()
selected_option = form.getvalue("wybor")

data = {"wiosna": 0, "lato": 0, "jesien": 0, "zima": 0}

if selected_option is not None:
    with open("data.json", "r") as json_file:
        data = json.load(json_file)

    data[selected_option] = data[selected_option] + 1

    # Zapisz zaktualizowane dane z powrotem do pliku JSON
    with open("data.json", "w") as json_file:
        json.dump(data, json_file)

print("Content-Type: application/json")
print()
print(
    json.dumps(
   {"pory_roku" : [
    {"ilosc": data["wiosna"]},
    {"ilosc": data["lato"]},
    {"ilosc": data["jesien"]},
    {"ilosc": data["zima"]}
   ]}   
))
