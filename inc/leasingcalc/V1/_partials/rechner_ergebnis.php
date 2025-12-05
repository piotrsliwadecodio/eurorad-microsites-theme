<tr id="leasingRow" class="row2018">
  <td id="lur_ergebnis_regulaer-1" class="lur_content_label lur_footer lur_footer_1" colspan="2">
      Monatliche Leasingrate <?php if($siteOptions['text_after_ergebnis_Monatliche_Leasingrate']) { echo $siteOptions['text_after_ergebnis_Monatliche_Leasingrate']; }?>
  </td>
  <td class="lur_footer lur_footer_erg lur_footer_1">
    <div class="lur_leasing_monat_brutto-brutto"><span id="lur_leasing_monat" class="lur_leasing_monat"> -- </span></div>
    <div class="lur_leasing_monat_brutto-netto"><span id="lur_leasing_monat_netto" class="lur_leasing_monat lur_leasing_monat_netto"> -- </span></div>
  </td>
</tr>
<tr class="versRow row2018">
  <td id="lur_ergebnis_regulaer-2" class="lur_content_label lur_footer lur_footer_1" colspan="2">
      Monatliche Versicherungsprämie für Bike # <span class="bikeNoFooter"></span>
    (<?php if($siteOptions['prefix']==='zeg') { ?><a href="https://www.eurorad.de/versicherung" class="info_icon" target="_blank" ><?php } else { ?><a href="#" class="lur_open_popout" data-ref="insurance-table"><?php } ?><span class="lur_content_paket lur_content_paket-premiumPlusOV">PremiumPLUS ohne Verschleiß</span><span class="lur_content_paket lur_content_paket-premiumPlus">PremiumPLUS</span><span class="lur_content_paket lur_content_paket-premiumPlus2">PremiumPLUS</span><span class="lur_content_paket lur_content_paket-premium">Premium</span><span class="lur_content_paket lur_content_paket-basis">Basis</span><span class="lur_content_paket lur_content_paket-alt">Rundum-Sorglos</span>-Paket</a>)
  </td>
  <td class="lur_footer lur_footer_erg lur_footer_1">
    <div class="lur_leasing_monat_brutto-brutto"><span id="lur_vers_monat" class="lur_vers_monat"> -- </span></div>
    <div class="lur_leasing_monat_brutto-netto"><span id="lur_vers_monat_netto" class="lur_vers_monat lur_versmonat_netto"> -- </span></div>
  </td>
</tr>
<tr class="employersshare-minus">
  <td class="lur_content_label lur_footer lur_footer_1" colspan="2">
    <div>Abzüglich Arbeitgeberzuschuss</div>
  </td>
  <td class="lur_footer lur_footer_erg lur_footer_1">
    <div class="employersshare-minus-value"></div>
  </td>
</tr> 
<tr>
  <td id="lur_ergebnis_regulaer-3" class="lur_content_label lur_footer lur_footer_1" colspan="2">
      <?php if($siteOptions['prefix'] === 'hkd') { ?>
        Leasingrate ohne Gehaltsumwandlung
      <?php } else { ?>
        monatliche Gesamtleasingrate
      <?php } ?>
      <span class="row2017">
        (<?php if($siteOptions['prefix']==='zeg') { ?><a href="https://www.eurorad.de/versicherung" class="info_icon" target="_blank" ><?php } else { ?><a href="#" class="lur_open_popout" data-ref="insurance-table"><?php } ?><span class="lur_content_paket lur_content_paket-premiumPlusOV">PremiumPLUS ohne Verschleiß</span><span class="lur_content_paket lur_content_paket-premiumPlus">PremiumPLUS</span><span class="lur_content_paket lur_content_paket-premiumPlus2">PremiumPLUS</span><span class="lur_content_paket lur_content_paket-premium">Premium</span><span class="lur_content_paket lur_content_paket-basis">Basis</span><span class="lur_content_paket lur_content_paket-alt">Rundum-Sorglos</span>-Paket</a>)
      </span>
  </td>
  <td class="lur_footer lur_footer_erg lur_footer_1">
    <div class="lur_leasing_monat_brutto-brutto"><span>inkl. MwSt.</span> <span id="lur_summe_monat" class="lur_summe_monat"> -- </span></div>
    <div class="lur_leasing_monat_brutto-netto"><span>exkl. MwSt.</span> <span id="lur_summe_monat_netto" class="lur_summe_monat lur_summe_monat_netto"> -- </span></div>
  </td>
</tr>
<tr>
  <td id="lur_ergebnis_leasing" class="lur_content_label lur_footer lur_footer_2" colspan="2">
    <strong>Tatsächliche monatliche Nettobelastung<?php if($siteOptions['prefix'] === 'hkd') { ?> durch die Gehaltsumwandlung<?php } ?>
    </strong>
    (inkl.
    <?php if($siteOptions['prefix']==='zeg') { ?><a href="https://www.eurorad.de/versicherung" class="info_icon" target="_blank" ><?php } else { ?><a href="#" class="lur_open_popout" data-ref="insurance-table"><?php } ?><span class="lur_content_paket lur_content_paket-premiumPlusOV">PremiumPLUS ohne Verschleiß</span><span class="lur_content_paket lur_content_paket-premiumPlus">PremiumPLUS</span><span class="lur_content_paket lur_content_paket-premiumPlus2">PremiumPLUS</span><span class="lur_content_paket lur_content_paket-basis">Basis</span><span class="lur_content_paket lur_content_paket-premium">Premium</span><span class="lur_content_paket lur_content_paket-alt">Rundum-Sorglos</span>-Paket</a>)
  </td>
  <td id="lur_leasing_umlage" class="lur_footer lur_footer_2 lur_footer_erg luf_footer_strong"> -- </td>
</tr>

<?php if(!$noSavings) { ?>
  <tr>
    <td id="lur_ersparnis_monat" class="lur_content_label lur_footer ersparnis" colspan="3">
      <div class="half first"><strong class="lur_content_paket lur_content_paket-premiumPlus lur_content_paket-premiumPlusOV lur_content_paket-premium lur_content_paket-alt">Ersparnis gegenüber Direktkauf<br/></strong>
      </div>
      <div class="half">
        <div class="lur_content_paket lur_content_paket-premium lur_content_paket-premiumPlus lur_content_paket-premiumPlusOV lur_content_paket-alt"><span id="lur_ersparnis_abs">-- €</span>*<br/><span id="lur_ersparnis_proz">-- %</span></div>
      </div>
    </td>
  </tr>
<?php } ?>

<tr class="whiterow">
  <td class="info" colspan="3">
    <p>(Unverbindliches Kalkulationsbeispiel. Die Berechnung hängt vom individuellen Einkommen, der Steuerklasse und den jeweiligen Freibeträgen ab. Bitte wenden Sie sich bei steuerlichen Fragen an Ihren Steuerberater.)</p>
    <p>Die Grundmietzeit beginnt mit dem Ersten des auf die Übernahme folgenden Kalendermonats. Erfolgt die Übernahme vor dem Beginn der Grundmietzeit, ist für die Zwischenzeit je Tag 1/30 der monatlichen Leasingrate zu zahlen.</p>
    <p>* Inkl. einer Vollkaskoversicherung in Höhe von 400 Euro je Bike (durchschnittlicher Wert für eine Vollkaskoversicherung mit Laufzeit von 36 Monaten); Zzgl. optionaler Restkaufwert.</p>
  </td>
</tr>
