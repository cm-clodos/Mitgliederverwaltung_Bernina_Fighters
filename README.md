# Mitgliederverwaltung UHC Bernina Fighters

Dies ist eine Mitgliederverwaltung für den Unihockey Verein UHC Bernina Fighters. Dieses Repository ist die Weiterentwicklung der Diplomarbeit NDS HF Applikationsentwicklung von Claudia Martinez.

## Inhaltsverzeichnis

- [Einleitung](#einleitung)
- [Installation](#installation)
- [Konfiguration](#konfiguration)
- [Benutzung](#benutzung-lokal)
- [Test Ausführung](#test-ausführung)
- [API Dokumentation](#api-dokumentation)
- [Entwicklerin](#entwicklerin)

## Einleitung

Diese Web-Applikation wurde speziell für den UHC Bernina Fighters entwickelt, um die Mitglieder- und Trikotverwaltung zu erleichtern.
Mit dieser Anwendung können Mitgliederdaten, Trikotinformationen und Zahlungsstatus der Mitglieder effizient verwaltet werden.
Darüber hinaus besteht die Möglichkeit, CSV-Exportlisten zu generieren und herunterzuladen.

### Voraussetzungen

Die Applikation wurde mit folgenden Versionen getestet:

- [MariaDB 10.10.2](https://mariadb.org/)
- [NodeJS 18.13.0](https://nodejs.org/en/)
- [NPM 8.19.3](https://www.npmjs.com/)

## Installation

### NodeJS und NPM

#### Installation von NodeJS und NPM für MacOS und Windows

- Installieren Sie NodeJS und NPM von der offiziellen Website
  https://nodejs.org/en/download

- Eine detaillierte Anleitung zum Installieren von NodeJS und NPM finden Sie hier:
  https://kinsta.com/de/blog/so-installierst-du-node-js/

### Datenbank

#### Installation MariaDB für MacOS

- Installieren Sie MariaDB mit Homebrew
  https://mariadb.com/resources/blog/installing-mariadb-10-1-16-on-mac-os-x-with-homebrew/

#### Installation MariaDB für Windows

- Installieren Sie MariaDB für Windows
  https://mariadb.com/downloads/community/community-server/
- Anleitung zur Installation von MariaDB für Windows
  https://mariadb.com/kb/en/installing-mariadb-msi-packages-on-windows/

#### Auto Start der Datenbank für MacOS mit Homebrew

- Starten Sie den Datenbank Service mit folgendem Befehl:

```
brew services start mariadb
```

- Stoppen Sie den Datenbank Service mit folgendem Befehl:

```
brew services stop mariadb
```

### Installation der Abhängigkeiten

Um alle Abhängigkeiten zu installieren, führen Sie folgende Befehle aus:

```bash
npm install
```

```bash
cd client && npm install
```

```bash
cd server && npm install
```

## Konfiguration

### Environment Variablen

Die Applikation hat bereits für den Server und den Client je eine Beispiel example.env Datei. Diese muss kopiert, umbenannt und angepasst werden.

1. Kopieren Sie die Datei example.env und benennen Sie diese in .env um.
2. Öffnen Sie die Datei .env und passen Sie die Variablen an, die mit Platzhaltern versehen sind.
3. Speichern Sie die Datei .env
4. Stellen Sie sicher, dass die Datei .env nicht in das Git Repository geladen wird. Fügen Sie die Datei .env in die .gitignore Datei ein.

### Erstellung Secret Key für Verschlüsselung

Für den Verschlüsselungs-Service wird ein Secret Key benötigt. Dieser kann mit folgendem Befehl erstellt werden:

> **WICHTIG!**
>
> Bevor der Secret Key erstellt werden kann, muss die .env Datei bereits erstellt worden sein! Siehe Abschnitt [Environment Variablen](#environment-variablen).

1. Führen Sie folgenden Befehl aus:

```bash
cd server && npm run config-keys
```

In der .env Datei wurden nun die Variablen SECRET_KEY und ALGORITHM mit den entsprechenden Werten gefüllt.

### Ausführung der SQL Skripte

Im Ordner sql befinden sich die SQL Skripte für die Erstellung der Datenbank und der Testdatenbank. Die Skripte müssen in der Reihenfolge ausgeführt werden, wie sie im Ordner sql aufgelistet sind.

1. Ausführen des Datenbank Installations Skripts im Verzeichnis sql/installation (Der Datenbank Name muss der gleiche sein, wie in der .env Datei!)
2. Ausführen der Tabellen Skripte im Verzeichnis sql/tables (Reihenfolge beachten!)
3. OPTIONAL: Ausführen des Skripts im Verzeichnis sql/data (Erstellt initiale Trikotdaten)

Wurde die Datenbank erstellt kann der Vorgang wiederholt werden und eine Testdatenbank erstellt werden. Die Testdatenbank muss einen anderen Namen haben, als die Produktive Datenbank.(Der Testdatenbank Name muss der gleiche sein, wie in der .env Datei!)

### Konfiguration Firebase Authentifizierung Client

Die Applikation verwendet eine Firebase Authentifizierung. Um die Applikation lokal zu testen, muss ein Firebase Projekt erstellt werden.

1. Erstellen Sie ein Firebase Projekt
2. Erstellen Sie eine Web Applikation und fügen Sie die Konfigurationsdaten in das .env im Client Verzeichnis ein.
3. Aktivieren Sie die Authentifizierung mit E-Mail und Passwort im Firebase Projekt.

### Konfiguration Firebase Authentifizierung Server

Für die Authentifizierung mit Firebase wird ein Service Account benötigt. Dieser kann wie folgt erstellt werden:

1. Gehen Sie in das erstellte Firebase Projekt unter Projekteinstellungen/Dienstkonten und erstellen Sie ein neuen privaten Schlüssel.
2. Speichern Sie das JSON File in das Verzeichnis server/config. (Oder in ein anderes Verzeichnis Ihrer Wahl)
3. Füge die Datei dem .gitignore File hinzu, damit diese nicht in das Git Repository geladen wird.
4. Ergänze die .env Datei mit dem Pfad zur Service Account Datei.

Mehr Informationen zur Firebase Authentifizierung finden Sie hier:
https://firebase.google.com/docs/auth?hl=de

## Benutzung (Lokal)

### Applikation starten (Server und Client in Production Mode)

Mit folgendem Befehl wird die Applikation gestartet:

```bash
npm run prodStart
```

### Applikation starten (Server und Client in Development Mode)

Mit folgendem Befehl wird die Applikation gestartet:

```bash
npm run devStart
```

### Server starten

Mit folgendem Befehl wird der Server gestartet:

```bash
cd server && npm run start
```

### Server starten mit Verbindung zur Testdatenbank

Mit folgendem Befehl wird der Server gestartet und verbindet sich mit der Testdatenbank:

```bash
cd server && npm run dev
```

### Client starten

Mit folgendem Befehl wird der Client gestartet:

```bash
cd client && npm run serve
```

## Test Ausführung

### Server Tests

Mit folgendem Befehl werden die Server Tests ausgeführt:

```bash
cd server && npm run test
```

### Client Tests

Mit folgendem Befehl werden die Client Tests ausgeführt:

```bash
cd client && npm run test
```

### E2E Tests

#### Konfiguration E2E Tests

Für die E2E Test muss ein Test User erstellt werden in der Firebase Konsole. Die Userdaten werden im cypress/fixtures/auth-user.json gespeichert und in der .gitignore Datei hinzugefügt werden. (Verwende die Example Datei und bennene sie um.)

Ebenfalls muss im Root des Client Verzeichnis eine cypress.env.json erstellt werden und in der .gitignore Datei hinzugefügt werden. In der cypress.env.json müssen die Firebase Konfigurationsdaten eingetragen werden. (Verwende die Example Datei und bennene sie um.)

#### Ausführung E2E Tests

Um die E2E Tests auszuführen, muss die Applikation im Development Mode gestartet sein. Stellen Sie sicher, dass Sie sich im Hauptverzeichnis befinden. Führen Sie folgenden Befehl aus:

```bash
npm run test:e2e
```

## API Dokumentation

Die API Dokumentation wurde mit Swagger erstellt. Die Dokumentation kann unter folgendem Link aufgerufen werden:
http://127.0.0.1:3000/api-docs/

> **WICHTIG!**
>
> Host und Port des Servers können in der .env Datei angepasst werden und von dem vorgeschlagenen Link abweichen.
>
> Der Server muss gestartet sein, damit die API Dokumentation aufgerufen werden kann.

## Entwicklerin

Claudia Martinez
