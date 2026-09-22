/**
 * EZpac — Journal des devis vers Google Sheets
 *
 * INSTALLATION :
 * 1. Créez un nouveau Google Sheet (ex. "EZpac - Devis reçus").
 * 2. Menu Extensions > Apps Script.
 * 3. Supprimez le code par défaut et collez tout ce fichier.
 * 4. Cliquez sur "Déployer" > "Nouveau déploiement" > type "Application Web".
 *    - Exécuter en tant que : Moi
 *    - Qui a accès : Tout le monde
 * 5. Copiez l'URL "Application Web" fournie (se termine par /exec).
 * 6. Collez cette URL dans CONFIG.SHEETS_WEBHOOK_URL du fichier index.html.
 */

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);

  // Créer les en-têtes si la feuille est vide
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Date", "Événement", "Nom", "Téléphone", "Email", "Détail du devis"]);
  }

  const cartSummary = (data.cart || []).map(function(item, i) {
    return "Article " + (i + 1) + ": " + item.typeKey + " / " + item.format + " / " +
      item.gram + "g / " + item.color + " / qty:" + item.qty + " / " + item.printKey +
      (item.printDetails ? " / " + item.printDetails : "") +
      (item.fileName ? " / fichier:" + item.fileName : "");
  }).join(" | ");

  sheet.appendRow([
    data.date || new Date().toISOString(),
    data.event || "",
    (data.client && data.client.name) || "",
    (data.client && data.client.phone) || "",
    (data.client && data.client.email) || "",
    cartSummary
  ]);

  return ContentService.createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}
