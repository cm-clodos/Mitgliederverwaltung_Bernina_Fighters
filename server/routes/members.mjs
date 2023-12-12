import express from "express";
import memberController from "../controller/memberController.mjs";
import { memberDataSanitzer } from "../middleware/inputSanitizer.mjs";
import { validateMemberData } from "../middleware/validateMemberData.mjs";
import { authenticateToken } from "../middleware/authenticate.mjs";

const router = express.Router();

/**
 * @swagger
 * /members:
 *   get:
 *     summary: Liste aller Mitglieder abrufen
 *     description: Eine Liste aller Mitglieder aus der Datenbank abrufen
 *     responses:
 *       '200':
 *         description: Eine Liste von Mitgliedern
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   firstname:
 *                     type: string
 *                     example: John
 *                     description: Der Vorname des Mitglieds
 *                   lastname:
 *                     type: string
 *                     example: Doe
 *                     description: Der Nachname des Mitglieds
 *                   email:
 *                     type: string
 *                     example: john.doe@example.com
 *                     description: Die E-Mail-Adresse des Mitglieds
 *                   telephone:
 *                     type: string
 *                     example: 0123456789
 *                     description: Die Telefonnummer des Mitglieds
 *                   active:
 *                     type: integer
 *                     example: 1
 *                     description: Der Aktivstatus des Mitglieds
 *                   role:
 *                     type: string
 *                     example: Mitglied
 *                     description: Die Rolle des Mitglieds
 *                   entry_date:
 *                     type: string
 *                     example: 2021-01-01
 *                     description: Das Eintrittsdatum des Mitglieds
 *
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
router.get("/", authenticateToken, memberController.handleGetAllMembers);
/**
 * @swagger
 * /members/roles:
 *   get:
 *     summary: Liste aller Mitgliederrollen abrufen
 *     description: Eine Liste aller Mitgliederrollen aus der Datenbank abrufen
 *     responses:
 *       '200':
 *         description: Eine Liste von Mitgliederrollen
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   role:
 *                     type: string
 *                     example: Mitglied
 *                     description: Die Rolle des Mitglieds
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
router.get("/roles", authenticateToken, memberController.handleGetAllRoles);
/**
 * @swagger
 * /members/payments:
 *   get:
 *     summary: Bezahlliste aller Mitglieder abrufen
 *     description: Eine Bezahlliste aller Mitglieder aus der Datenbank abrufen
 *     responses:
 *       '200':
 *         description: Eine Bezahlliste von Mitgliedern
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   paid:
 *                     type: integer
 *                     example: 1
 *                     description: Der Bezahlstatus des Mitglieds
 *                   paid_date:
 *                     type: string
 *                     example: 2021-02-01
 *                     description: Das Datum der Bezahlung des Mitglieds
 *                   created_at:
 *                     type: string
 *                     example: 2021-01-01
 *                     description: Die Erstellungszeit der Bezahlperiode
 *                   firstname:
 *                     type: string
 *                     example: John
 *                     description: Der Vorname des Mitglieds
 *                   lastname:
 *                     type: string
 *                     example: Doe
 *                     description: Der Nachname des Mitglieds
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
router.get("/payments", authenticateToken, memberController.handleGetAllPayments);
/**
 * @swagger
 * /members/payments/period:
 *   get:
 *     summary: Bezahlperioden Liste aller Mitglieder abrufen
 *     description: Eine Bezahlperioden Liste aller Mitglieder aus der Datenbank abrufen
 *     responses:
 *       '200':
 *         description: Eine Bezahlperioden Liste
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   created_at:
 *                     type: string
 *                     example: 2021-01-01
 *                     description: Die Erstellungszeit der Bezahlperiode
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
router.get("/payments/period", authenticateToken, memberController.handleGetAllPaymentPeriods);
/**
 * @swagger
 * /members/payments/{id}:
 *   get:
 *     summary: Zahlung anhand der ID abrufen
 *     description: Eine Zahlung anhand der ID aus der Datenbank abrufen
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Die ID der Zahlung
 *     responses:
 *       '200':
 *         description: Eine Zahlung anhand der ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: Erfolgsstatus der Anfrage
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       paid:
 *                         type: integer
 *                         example: 1
 *                       paid_date:
 *                         type: string
 *                         example: 2021-02-01
 *                       created_at:
 *                         type: string
 *                         example: 2021-01-01
 *                       member_id:
 *                         type: integer
 *                         example: 1
 *       '404':
 *         description: Zahlung wurde nicht gefunden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: string
 *                   example: pe-404
 *                   description: Der Fehlercode
 *                 message:
 *                   type: string
 *                   example: Zahlung wurde nicht gefunden
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
router.get("/payments/:id", authenticateToken, memberController.handleGetPaymentById);
/**
 * @swagger
 * /members/{id}/info:
 *   get:
 *     summary: Mitglied Info anhand der ID abrufen mit der dazugehörigen Rollenbezeichnung
 *     description: Einzelnes Mitglied anhand der ID aus der Datenbank abrufen mit der dazugehörigen Rollenbezeichnung
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Die ID des Mitglieds
 *     responses:
 *       '200':
 *         description: Einzelnes Mitglied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 firstname:
 *                   type: string
 *                   example: John
 *                   description: Der Vorname des Mitglieds
 *                 lastname:
 *                   type: string
 *                   example: Doe
 *                   description: Der Nachname des Mitglieds
 *                 email:
 *                   type: string
 *                   example: john.doe@example.com
 *                   description: Die E-Mail-Adresse des Mitglieds
 *                 telephone:
 *                   type: string
 *                   example: 0123456789
 *                   description: Die Telefonnummer des Mitglieds
 *                 active:
 *                   type: integer
 *                   example: 1
 *                   description: Der Aktivstatus des Mitglieds
 *                 role:
 *                   type: string
 *                   example: Mitglied
 *                   description: Die Rolle des Mitglieds
 *                 entry_date:
 *                   type: string
 *                   example: 2021-01-01
 *                   description: Das Eintrittsdatum des Mitglieds
 *       '404':
 *         description: Mitglied nicht gefunden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: string
 *                   example: me-404
 *                   description: Der Fehlercode
 *                 message:
 *                   type: string
 *                   example: Mitglied wurde nicht gefunden
 *                   description: Die Fehlermeldung
 *                 relatedColumn:
 *                   type: string
 *                   nullable: true
 *                   description: Die betroffene Spalte (falls zutreffend)
 *                 success:
 *                  type: boolean
 *                  example: false
 *                  description: Erfolgsstatus der Anfrage
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
router.get("/:id/info", authenticateToken, memberController.handleGetAllMemberInfo);
/**
 * @swagger
 * /members/{id}:
 *   get:
 *     summary: Mitglied anhand der ID abrufen
 *     description: Einzelnes Mitglied anhand der ID aus der Datenbank abrufen
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Die ID des Mitglieds
 *     responses:
 *       '200':
 *         description: Einzelnes Mitglied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 firstname:
 *                   type: string
 *                   example: John
 *                   description: Der Vorname des Mitglieds
 *                 lastname:
 *                   type: string
 *                   example: Doe
 *                   description: Der Nachname des Mitglieds
 *                 email:
 *                   type: string
 *                   example: john.doe@example.com
 *                   description: Die E-Mail-Adresse des Mitglieds
 *                 telephone:
 *                   type: string
 *                   example: 0123456789
 *                   description: Die Telefonnummer des Mitglieds
 *                 active:
 *                   type: integer
 *                   example: 1
 *                   description: Der Aktivstatus des Mitglieds
 *                 role:
 *                   type: integer
 *                   example: 2
 *                   description: Die Rolle des Mitglieds
 *                 entry_date:
 *                   type: string
 *                   example: 2021-01-01
 *                   description: Das Eintrittsdatum des Mitglieds
 *       '404':
 *         description: Mitglied nicht gefunden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: string
 *                   example: me-404
 *                   description: Der Fehlercode
 *                 message:
 *                   type: string
 *                   example: Mitglied wurde nicht gefunden
 *                   description: Die Fehlermeldung
 *                 relatedColumn:
 *                   type: string
 *                   nullable: true
 *                   description: Die betroffene Spalte (falls zutreffend)
 *                 success:
 *                  type: boolean
 *                  example: false
 *                  description: Erfolgsstatus der Anfrage
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
router.get("/:id", authenticateToken, memberController.handleGetMemberById);
/**
 * @swagger
 * /members:
 *   post:
 *     summary: Neues Mitglied hinzufügen
 *     description: Neues Mitglied in die Datenbank hinzufügen
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: John
 *                 description: Der Vorname des Mitglieds
 *               lastname:
 *                 type: string
 *                 example: Doe
 *                 description: Der Nachname des Mitglieds
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *                 description: Die E-Mail-Adresse des Mitglieds
 *               telephone:
 *                 type: string
 *                 example: 0123456789
 *                 description: Die Telefonnummer des Mitglieds
 *               active:
 *                 type: integer
 *                 example: 1
 *                 description: Der Aktivstatus des Mitglieds
 *               role:
 *                 type: string
 *                 example: Mitglied
 *                 description: Die Rolle des Mitglieds
 *               entry_date:
 *                 type: string
 *                 example: 2021-01-01
 *                 description: Das Eintrittsdatum des Mitglieds
 *     responses:
 *       '201':
 *         description: Mitglied erfolgreich in die Datenbank hinzugefügt
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
 *                   example: Mitglied erfolgreich hinzugefügt
 *
 *       '400':
 *         description: Wenn bereits ein Mitglied mit der E-Mail-Adresse oder Telefonnummer existiert
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: string
 *                   example: me-400
 *                   description: Der Fehlercode
 *                 message:
 *                   type: string
 *                   example: Email oder Telefonnummer existiert bereits
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
  memberDataSanitzer,
  validateMemberData,
  memberController.handleNewMember
);
/**
 * @swagger
 * /members/payments/{id}:
 *   put:
 *     summary: Bezahlstatus eines Mitglieds aktualisieren anhand der Bezahl-ID
 *     description: Bezahlstatus eines Mitglieds aktualisieren anhand der Bezahl-ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Die ID des Mitglieds
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paid:
 *                 type: integer
 *                 example: 1
 *                 description: Der Bezahlstatus des Mitglieds
 *     responses:
 *       '200':
 *         description: Erfolgreiche Aktualisierung des Bezahlstatus des Mitglieds
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
 *                   example: Zahlung erfolgreich aktualisiert
 *                   description: Die Erfolgsmeldung
 *       '404':
 *         description: Zahlung wurde nicht gefunden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: string
 *                   example: pe-404
 *                   description: Der Fehlercode
 *                 message:
 *                   type: string
 *                   example: Zahlung wurde nicht gefunden
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
router.put("/payments/:id", authenticateToken, memberController.handleUpdatePayment);
/**
 * @swagger
 * /members/payments/period:
 *   post:
 *     summary: Neue Bezahlperiode erstellen
 *     description: Neue Bezahlperiode erstellen in der Datenbank
 *     responses:
 *       '201':
 *         description: Neue Zahlungsperiode erfolgreich hinzugefügt
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
 *                   example: Neue Zahlungsperiode erfolgreich hinzugefügt
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
router.post("/payments/period", authenticateToken, memberController.handleCreateNewPaymentPeriod);
/**
 * @swagger
 * /members/{id}:
 *   put:
 *     summary: Mitglied anhand der ID aktualisieren
 *     description: Einzelnes Mitglied anhand der ID in der Datenbank aktualisieren
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Die ID des Mitglieds
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: John
 *                 description: Der Vorname des Mitglieds
 *               lastname:
 *                 type: string
 *                 example: Doe
 *                 description: Der Nachname des Mitglieds
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *                 description: Die E-Mail-Adresse des Mitglieds
 *               telephone:
 *                 type: string
 *                 example: 0123456789
 *                 description: Die Telefonnummer des Mitglieds
 *               active:
 *                 type: integer
 *                 example: 1
 *                 description: Der Aktivstatus des Mitglieds
 *               role:
 *                 type: string
 *                 example: Mitglied
 *                 description: Die Rolle des Mitglieds
 *               entry_date:
 *                 type: string
 *                 example: 2021-01-01
 *                 description: Das Eintrittsdatum des Mitglieds
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
 *                   example: Mitglied erfolgreich aktualisiert
 *                   description: Die Erfolgsmeldung
 *       '400':
 *         description: Wenn bereits ein Mitglied mit der E-Mail-Adresse oder Telefonnummer existiert
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: string
 *                   example: me-400
 *                   description: Der Fehlercode
 *                 message:
 *                   type: string
 *                   example: Email oder Telefonnummer existiert bereits
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
 *         description: Mitglied nicht gefunden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: string
 *                   example: me-404
 *                   description: Der Fehlercode
 *                 message:
 *                   type: string
 *                   example: Mitglied wurde nicht gefunden
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
  memberDataSanitzer,
  validateMemberData,
  memberController.handleUpdateMember
);
/**
 * @swagger
 * /members/{id}:
 *   delete:
 *     summary: Mitglied anhand der ID löschen
 *     description: Einzelnes Mitglied anhand der ID aus der Datenbank löschen
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Die ID des Mitglieds
 *     responses:
 *       '200':
 *         description: Erfolgreiche Löschung des Mitglieds
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
 *                   example: Mitglied erfolgreich gelöscht
 *                   description: Die Erfolgsmeldung
 *       '404':
 *         description: Mitglied nicht gefunden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: string
 *                   example: me-404
 *                   description: Der Fehlercode
 *                 message:
 *                   type: string
 *                   example: Mitglied wurde nicht gefunden
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
router.delete("/:id", authenticateToken, memberController.handleDeleteMember);
/**
 * @swagger
 * /members/mail/export/download:
 *   post:
 *     summary: E-Mail-Adressen aller Mitglieder exportieren anhand der Filterkriterien
 *     description: E-Mail-Adressen aller Mitglieder exportieren anhand der Filterkriterien
 *     parameters:
 *       - in: query
 *         name: filter
 *         required: true
 *         schema:
 *           type: string
 *           enum: [all, paid, unpaid]
 *         description: Der Filter für die Mitglieder E-Mail Liste
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *         description: Der Zeitraum der Bezahlperiode (z.B. 2021)
 *     responses:
 *       '200':
 *         description: Erfolgreicher Download der E-Mail-Adressen als CSV-Datei
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
router.post("/mail/export/download", authenticateToken, memberController.handleMailListExportFile);
/**
 * @swagger
 * /members/export/download:
 *   post:
 *     summary: Mitgliederliste exportieren anhand der Filterkriterien
 *     description: Mitgliederliste exportieren anhand der Filterkriterien
 *     parameters:
 *       - in: query
 *         name: filter
 *         required: true
 *         schema:
 *           type: string
 *           enum: [all, active]
 *         description: Der Filter für die Mitglieder Liste
 *     responses:
 *       '200':
 *         description: Erfolgreicher Download der Mitglieder Liste als CSV-Datei
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
router.post("/export/download", authenticateToken, memberController.handleMemberListExportFile);

export default router;
