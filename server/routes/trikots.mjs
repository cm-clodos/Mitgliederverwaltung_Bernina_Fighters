import express from "express";
import trikotController from "../controller/trikotController.mjs";
import { trikotDataSanitizer } from "../middleware/inputSanitizer.mjs";
import { validateTrikotData } from "../middleware/validateTrikotData.mjs";
import { authenticateToken } from "../middleware/authenticate.mjs";

const router = express.Router();
/**
 * @swagger
 * /trikots:
 *   get:
 *     summary: Liste aller Trikots abrufen
 *     description: Eine Liste aller Trikots aus der Datenbank abrufen
 *     responses:
 *       '200':
 *         description: Eine Liste von Trikots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   memberId:
 *                     type: integer
 *                     nullable: true
 *                     example: 1
 *                     description: Die ID des Mitglieds das das Trikot trägt
 *                   firstname:
 *                     type: string
 *                     example: John
 *                     description: Der Vorname des Mitglieds
 *                   lastname:
 *                     type: string
 *                     example: Doe
 *                     description: Der Nachname des Mitglieds
 *                   number:
 *                     type: integer
 *                     example: 77
 *                     description: Die Trikotnummer des Trikots
 *                   name:
 *                     type: string
 *                     example: BellaVista
 *                     description: Der Trikotname des Trikots
 *                   available:
 *                     type: integer
 *                     example: 0
 *                     description: Der Verfügbarkeitsstatus des Trikots
 *       '500':
 *         description: Interner Serverfehler
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: string
 *                   example: ee-999
 *                   description: Der Fehlercode
 *                 message:
 *                   type: string
 *                   example: Unbekannter Fehler
 *                   description: Die Fehlermeldung
 *                 relatedColumn:
 *                   type: string
 *                   nullable: true
 *                   description: Die betroffene Spalte (falls zutreffend)
 *                 success:
 *                  type: boolean
 *                  example: false
 *                  description: Erfolgsstatus der Anfrage
 */
router.get("/", authenticateToken, trikotController.handleGetAllTrikots);
/**
 * @swagger
 * /trikots:
 *   post:
 *     summary: Neues Trikot hinzufügen
 *     description: Neues Trikot in die Datenbank hinzufügen
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: integer
 *                 example: 77
 *                 description: Die Trikotnummer des Trikots
 *               name:
 *                 type: string
 *                 example: BellaVista
 *                 description: Der Trikotname des Trikots
 *               available:
 *                 type: integer
 *                 example: 0
 *                 description: Der Verfügbarkeitsstatus des Trikots
 *               member_id:
 *                 type: integer
 *                 nullable: true
 *                 example: 12
 *                 description: Die ID des Mitglieds das das Trikot trägt
 *     responses:
 *       '201':
 *         description: Trikot erfolgreich in die Datenbank hinzugefügt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                  type: boolean
 *                  example: true
 *                 message:
 *                   type: string
 *                   example: Trikot erfolgreich hinzugefügt
 *
 *       '400':
 *         description: Wenn bereits ein Trikot mit der angegebenen Trikotnummer existiert oder ein Mitglied bereits ein Trikot besitzt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: string
 *                   example: te-400
 *                   description: Der Fehlercode
 *                 message:
 *                   type: string
 *                   example: Trikotnummer existiert bereits oder Mitglied besitzt bereits ein Trikot
 *                   description: Die Fehlermeldung
 *                 relatedColumn:
 *                   type: string
 *                   nullable: true
 *                   description: Die betroffene Spalte (falls zutreffend)
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Erfolgsstatus der Anfrage
 *       '500':
 *         description: Interner Serverfehler
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: string
 *                   example: ee-999
 *                   description: Der Fehlercode
 *                 message:
 *                   type: string
 *                   example: Unbekannter Fehler
 *                   description: Die Fehlermeldung
 *                 relatedColumn:
 *                   type: string
 *                   nullable: true
 *                   description: Die betroffene Spalte (falls zutreffend)
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Erfolgsstatus der Anfrage
 */
router.post(
  "/",
  authenticateToken,
  trikotDataSanitizer,
  validateTrikotData,
  trikotController.handleNewTrikot
);
/**
 * @swagger
 * /trikots/{number}:
 *   put:
 *     summary: Trikot anhand der Trikotnummer aktualisieren
 *     description: Einzelnes Trikot anhand der Trikotnummer in der Datenbank aktualisieren
 *     parameters:
 *       - in: path
 *         name: number
 *         required: true
 *         schema:
 *           type: integer
 *         description: Die Trikotnummer des Trikots
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: BellaVista
 *                 description: Der Trikotname des Trikots
 *               available:
 *                 type: integer
 *                 example: 0
 *                 description: Der Verfügbarkeitsstatus des Trikots
 *               member_id:
 *                 type: integer
 *                 nullable: true
 *                 example: 12
 *                 description: Die ID des Mitglieds das das Trikot trägt
 *     responses:
 *       '200':
 *         description: Erfolgreiche Aktualisierung des Mitglieds
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: Erfolgsstatus der Anfrage
 *                 message:
 *                   type: string
 *                   example: Trikot erfolgreich aktualisiert
 *                   description: Die Erfolgsmeldung
 *       '400':
 *         description: Wenn bereits ein Trikot mit der angegebenen Trikotnummer existiert oder ein Mitglied bereits ein Trikot besitzt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: string
 *                   example: te-400
 *                   description: Der Fehlercode
 *                 message:
 *                   type: string
 *                   example: Trikotnummer existiert bereits oder Mitglied besitzt bereits ein Trikot
 *                   description: Die Fehlermeldung
 *                 relatedColumn:
 *                   type: string
 *                   nullable: true
 *                   description: Die betroffene Spalte (falls zutreffend)
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Erfolgsstatus der Anfrage
 *       '404':
 *         description: Trikot nicht gefunden mit der angegebenen Trikotnummer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: string
 *                   example: te-404
 *                   description: Der Fehlercode
 *                 message:
 *                   type: string
 *                   example: Trikot wurde nicht gefunden
 *                   description: Die Fehlermeldung
 *                 relatedColumn:
 *                   type: string
 *                   nullable: true
 *                   description: Die betroffene Spalte (falls zutreffend)
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Erfolgsstatus der Anfrage
 *       '500':
 *         description: Interner Serverfehler
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: string
 *                   example: ee-999
 *                   description: Der Fehlercode
 *                 message:
 *                   type: string
 *                   example: Unbekannter Fehler
 *                   description: Die Fehlermeldung
 *                 relatedColumn:
 *                   type: string
 *                   nullable: true
 *                   description: Die betroffene Spalte (falls zutreffend)
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Erfolgsstatus der Anfrage
 */
router.put(
  "/:id",
  authenticateToken,
  trikotDataSanitizer,
  validateTrikotData,
  trikotController.handleUpdateTrikot
);
/**
 * @swagger
 * /trikots/{number}:
 *   delete:
 *     summary: Trikot anhand der Trikotnummer löschen
 *     description: Einzelnes Trikot anhand der Trikotnummer aus der Datenbank löschen
 *     parameters:
 *       - in: path
 *         name: number
 *         required: true
 *         schema:
 *           type: integer
 *         description: Die Trikotnummer des Trikots
 *     responses:
 *       '200':
 *         description: Erfolgreiche Löschung des Trikots
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: Erfolgsstatus der Anfrage
 *                 message:
 *                   type: string
 *                   example: Trikot erfolgreich gelöscht
 *                   description: Die Erfolgsmeldung
 *       '404':
 *         description: Trikot anhand der Trikotnummer nicht gefunden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: string
 *                   example: te-404
 *                   description: Der Fehlercode
 *                 message:
 *                   type: string
 *                   example: Trikot wurde nicht gefunden
 *                   description: Die Fehlermeldung
 *                 relatedColumn:
 *                   type: string
 *                   nullable: true
 *                   description: Die betroffene Spalte (falls zutreffend)
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Erfolgsstatus der Anfrage
 *       '500':
 *         description: Interner Serverfehler
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: string
 *                   example: ee-999
 *                   description: Der Fehlercode
 *                 message:
 *                   type: string
 *                   example: Unbekannter Fehler
 *                   description: Die Fehlermeldung
 *                 relatedColumn:
 *                   type: string
 *                   nullable: true
 *                   description: Die betroffene Spalte (falls zutreffend)
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Erfolgsstatus der Anfrage
 */
router.delete("/:id", authenticateToken, trikotController.handleDeleteTrikot);
/**
 * @swagger
 * /trikots/export/download:
 *   post:
 *     summary: Trikotliste exportieren anhand der Filterkriterien
 *     description: Trikotliste exportieren anhand der Filterkriterien
 *     parameters:
 *       - in: query
 *         name: filter
 *         required: true
 *         schema:
 *           type: string
 *           enum: [all, available]
 *         description: Der Filter für die Trikot Liste
 *     responses:
 *       '200':
 *         description: Erfolgreicher Download der Trikotliste als CSV-Datei
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *       '404':
 *         description: Erstellte Datei wurde auf dem Server nicht gefunden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: string
 *                   example: fe-404
 *                   description: Der Fehlercode
 *                 message:
 *                   type: string
 *                   example: Datei nicht gefunden
 *                   description: Die Fehlermeldung
 *                 relatedColumn:
 *                   type: string
 *                   nullable: true
 *                   description: Die betroffene Spalte (falls zutreffend)
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Erfolgsstatus der Anfrage
 *       '500':
 *         description: Interner Serverfehler
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: string
 *                   example: ee-999
 *                   description: Der Fehlercode
 *                 message:
 *                   type: string
 *                   example: Unbekannter Fehler
 *                   description: Die Fehlermeldung
 *                 relatedColumn:
 *                   type: string
 *                   nullable: true
 *                   description: Die betroffene Spalte (falls zutreffend)
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Erfolgsstatus der Anfrage
 */
router.post("/export/download", authenticateToken, trikotController.handleTrikotListExportFile);

export default router;
