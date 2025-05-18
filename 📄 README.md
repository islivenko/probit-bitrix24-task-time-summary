# Podsumowanie czasu zadań w Bitrix24

Ten skrypt Node.js służy do zliczania całkowitego czasu poświęconego na wszystkie zadania w określonym projekcie (grupie roboczej) w Bitrix24 za pomocą REST API.

## Funkcje

* Pobiera wszystkie zadania z wybranej grupy projektowej (ID grupy)
* Dla każdego zadania pobiera wpisy czasu (`task.elapseditem.getlist`)
* Sumuje całkowity czas w minutach i godzinach
* Wyświetla wynik w konsoli

## Wymagania

* Node.js w wersji 18 lub wyższej
* Webhook Bitrix24 z dostępem do metod `tasks.task.list` i `task.elapseditem.getlist`
* Biblioteka `node-fetch`

## Instalacja

1. Sklonuj repozytorium:

   ```bash
   git clone https://github.com/twoja-firma/bitrix24-task-time-summary.git
   cd bitrix24-task-time-summary
   ```

2. Zainstaluj zależności:

   ```bash
   npm install
   ```

3. Edytuj plik `get_time_project.mjs`, ustawiając:

   * `webhookUrl` – adres webhooka Bitrix24
   * `groupId` – ID grupy projektowej

4. Uruchom skrypt:

   ```bash
   node get_time_project.mjs
   ```

## Przykład działania

```
Zadanie 2045: 60 minut
Zadanie 2047: 300 minut
Zadanie 2049: 420 minut

Łączny czas w projekcie (grupa 51): 780 minut (13.00 godziny)
```

## Licencja

MIT
