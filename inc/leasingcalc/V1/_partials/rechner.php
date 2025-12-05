<table id="lur_content" class="lur_content">
    <tbody>
      <?php include('rechner_bikes.php'); ?>
      <?php include('rechner_jahr.php'); ?>
      <?php include('rechner_versicherung.php'); ?>
      <?php include('rechner_subventionen.php'); ?>
      <?php include('rechner_ust.php'); ?>
      <?php include('rechner_gehalt.php'); ?>
      <?php include('rechner_steuerklasse.php'); ?>
      <?php include('rechner_kirchensteuer.php'); ?>
      <?php include('rechner_bundesland.php'); ?>
      <?php include('rechner_beamte.php'); ?>
      <?php include('rechner_krankenkasse.php'); ?>
      <?php include('rechner_rente.php'); ?>
      <?php include('rechner_kinder.php'); ?>
      <?php include('rechner_geburtsjahr.php'); ?>

      <?php include('rechner_ergebnis.php'); ?>
   </tbody>
</table>


<div class="lur_popout lur_popout--insurance-table ">
   <span class="close">schließen</span>

   <div class="lur_popout_container">
   <div class="lur_content_paket-premium lur_content_paket-premiumPlus lur_content_paket-premiumPlusOV lur_content_paket-basis lur_content_paket">
      <?php include('insurance-table.php'); ?>
   </div>

   <div class="lur_content_paket-alt">
   <div class="lur_content_paket-alt lur_content_paket">
      <h3>Ihr einzigartiger Vorteil durch das eurorad Rundum-Sorglos-Paket</h3>
      <p>3 Jahre lang keine zusätzlichen Kosten durch:</p>
      <ul><li>Materialfehler</li>
      <li>Produktionsfehler</li>
      <li>(Teil-) Diebstahl / Raub</li>
      <li>Vandalismus</li>
      <li>Unfall / Sturz</li>
      <li>Allgemeine Reparaturen</li>
      <li>Verschleiß (<span class="lur_popout_bold">auch bei E-Bikes!</span>)</li>
      <li>Unsachgemäße Handhabung</li>
      <li>Elektronikschäden</li>
      <li>Akkudefekt</li></ul>
      <p>und das <span class="lur_popout_bold">alles ohne Selbstbeteiligung!</span><p>
      <p>Allein durch den Wegfall der Kosten für Verschleiß-Reparaturen<sup>1</sup>  ergibt
      sich über die Gesamtlaufzeit erfahrungsgemäß ein Vorteil von 450 bis 600 Euro!</p>
      <span class="lur_popout_small"><sup>1</sup> Ersatzteile und Kosten pro Jahr: 1 Satz Reifen, Kette, Zahnkranz, 2 Satz Bremsbeläge, 130 Euro Material + 70 Euro Montage. Gesamtkosten über 3 Jahre: 600 Euro. <br />Dies ist eine Beispielrechnung für ein E-Bike. Die Nutzungsintensität und der Verschleiß sind erwiesenermaßen größer, da höhere Durchschnittsgeschwindigkeiten und längere Distanzen gefahren werden, als mit einem normalen Fahrrad.</span>
   </div>
   </div>
</div>
</div>

<div class="lur_popout lur_popout--bike-kaufpreis"><span class="close">schließen</span>
<div class="lur_popout_container">
   <p>Der hiergenannte Wert ist ein unverbindlicher Aktionspreis, den konkreten Bike-Kaufpreis erfahren Sie bei Ihrem Fachhändler.</p>
</div>
</div>


<div class="lur_popout lur_popout--anzahl"><span class="close">schließen</span>
   <div class="lur_popout_container">
   <h3>Bitte beachten Sie, dass nur <?php echo $bikeLimitMessage; ?></h3>
</div>
</div>


<div class="lur_popout lur_popout--bruttogehalt"><span class="close">schließen</span>
   <?php echo $siteOptions['explanation_bruttogehalt']; ?>
</div>
</div>

<div class="lur_popout lur_popout--kv-zusatzbeitrag"><span class="close">schließen</span>
<div class="lur_popout_container">
   <h3>KV-Zusatzbeitrag</h3>
   <?php echo do_shortcode($siteOptions['kv_erlauterung']); ?>
</div>
</div>


<div class="lur_popout lur_popout--employersshare"><span class="close">schließen</span>
<div class="lur_popout_container">
   <h3>Arbeitgeberzuschuss</h3>
  <?php echo do_shortcode($siteOptions['ag_zuschuss_erlauterung']); ?>
</div>
</div>

<div class="lur_popout lur_popout--vorsteuerabzugsberechtigt"  ><span class="close">schließen</span>
<div class="lur_popout_container">
   <h3>Vorsteuerabzugsberechtigung</h3>
   <?php echo do_shortcode($siteOptions['ust_erlauterung']); ?>
</div>
</div>


<div class="lur_popout lur_popout--geviertelter-bruttolistenpreis"><span class="close">schließen</span>
<div class="lur_popout_container">
   <h3>Geviertelter Bruttolistenpreis</h3>
   <?php echo do_shortcode($siteOptions['quarter_price_erlauterung']); ?> 
</div>
</div>