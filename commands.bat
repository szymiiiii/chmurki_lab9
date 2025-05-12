docker build -t dockerfile .
docker run -d -p 3000:3000 --name dockerfile -e OPENWEATHER_KEY="1c599e21b5cb378bbc3cb80d9b235a82" dockerfile
docker logs dockerfile
docker image inspect dockerfile --format="liczba warstw: {{ len .RootFS.Layers }} liczba bajtow: {{ .Size }}"

pause


