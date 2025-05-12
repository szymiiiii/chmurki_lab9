# chmurki_zadanie_1
Działająca aplikacja:

![image](https://github.com/user-attachments/assets/1685e451-cced-441f-a723-85da8cbe5a04)

a. zbudowania opracowanego obrazu kontenera

docker build -t dockerfile .

b. uruchomienia kontenera na podstawie zbudowanego obrazu

docker run -d -p 3000:3000 --name dockerfile -e OPENWEATHER_KEY="1c599e21b5cb378bbc3cb80d9b235a82" dockerfile

c. sposobu uzyskania informacji z logów, które wygenerowałą opracowana aplikacja podczas uruchamiana kontenera

docker logs dockerfile

d. sprawdzenia, ile warstw posiada zbudowany obraz oraz jaki jest rozmiar obrazu.

docker image inspect dockerfile --format="liczba warstw: {{ len .RootFS.Layers }} liczba bajtow: {{ .Size }}"
