<div class="insurance-table">
  <?php if(count($verspraemien) === 1) { ?>
    <?php if(in_array('premium', $verspraemien)) { ?>
      <h3>Ihr Premium-Schutz</h3>
    <?php } ?>

    <?php if(in_array('basis', $verspraemien)) { ?>
      <h3>Ihr Basis-Schutz</h3>
    <?php } ?>
  <?php } else { ?>
    <h3>Leistungen Versicherungsschutz im Vergleich</h3>
  <?php } ?>

  <table class="vergleich_verspraemie">

    <thead>
      <tr>
        <th>Reparatur oder Ersatz bei</th>
        <?php if(in_array('basis',$verspraemien)) { ?><th>Basis</th><?php } ?>
        <?php if(in_array('premium',$verspraemien)) { ?><th>Premium</th><?php } ?>
        <?php if(in_array('premiumPlus',$verspraemien)) { ?><th>PremiumPLUS</th><?php } ?>
        <?php if(in_array('premiumPlusOV',$verspraemien)) { ?><th>PremiumPLUS ohne Verschleiß</th><?php } ?>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Unfall</th>
        <?php if(in_array('basis',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        <?php if(in_array('premium',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        <?php if(in_array('premiumPlus',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        <?php if(in_array('premiumPlusOV',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
      </tr>
      <tr>
        <th>Sturz</th>
        <?php if(in_array('basis',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        <?php if(in_array('premium',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        <?php if(in_array('premiumPlus',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        <?php if(in_array('premiumPlusOV',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
      </tr>
      <tr>
        <th>Vandalismus</th>
        <?php if(in_array('basis',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        <?php if(in_array('premium',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        <?php if(in_array('premiumPlus',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        <?php if(in_array('premiumPlusOV',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
      </tr>
      <tr>
        <th>fahrlässige, unsachgemäße Handhabung</th>
        <?php if(in_array('basis',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        <?php if(in_array('premium',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        <?php if(in_array('premiumPlus',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        <?php if(in_array('premiumPlusOV',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
      </tr>
      <tr>
        <th>Elektronikschäden</th>
        <?php if(in_array('basis',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        <?php if(in_array('premium',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        <?php if(in_array('premiumPlus',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        <?php if(in_array('premiumPlusOV',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
      </tr>
      <tr>
        <th>Akku-Defekte</th>
        <?php if(in_array('basis',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        <?php if(in_array('premium',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        <?php if(in_array('premiumPlus',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        <?php if(in_array('premiumPlusOV',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
      </tr>
      <tr>
        <th>Material-, Produktions-, &amp; Konstruktionsfehler ab dem 25. Monat nach Abschluss des Leasingvertrags</th>
        <?php if(in_array('basis',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        <?php if(in_array('premium',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        <?php if(in_array('premiumPlus',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        <?php if(in_array('premiumPlusOV',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
      </tr>
      <tr>
        <th>Diebstahl</th>
        <?php if(in_array('basis',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        <?php if(in_array('premium',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        <?php if(in_array('premiumPlus',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        <?php if(in_array('premiumPlusOV',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
      </tr>
      <tr>
        <th>Einbruchsdiebstahl</th>
        <?php if(in_array('basis',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        <?php if(in_array('premium',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        <?php if(in_array('premiumPlus',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        <?php if(in_array('premiumPlusOV',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
      </tr>
      <tr>
        <th>Raub</th>
        <?php if(in_array('basis',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        <?php if(in_array('premium',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        <?php if(in_array('premiumPlus',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        <?php if(in_array('premiumPlusOV',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
      </tr>
      <tr>
        <th>Verschleiß ab dem 1. Tag</th>
        <?php if(in_array('basis',$verspraemien)) { ?><td><i class="icon-minus-sign-alt icon-" >&nbsp;</i></td><?php } ?>
        <?php if(in_array('premium',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        <?php if(in_array('premiumPlus',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        <?php if(in_array('premiumPlusOV',$verspraemien)) { ?><td><i class="icon-minus-sign icon-" >&nbsp;</i></td><?php } ?>
      </tr>
      <tr>
        <th>Kostenübernahme für UVV-Prüfung nach dem 1. und 2. Versicherungsjahr</th>
        <?php if(in_array('basis',$verspraemien)) { ?><td><i class="icon-minus-sign-alt icon-" >&nbsp;</i></td><?php } ?>
        <?php if(in_array('premium',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        <?php if(in_array('premiumPlus',$verspraemien)) { ?><td><i class="icon-minus-sign-alt icon-" >&nbsp;</i></td><?php } ?>
        <?php if(in_array('premiumPlusOV',$verspraemien)) { ?><td><i class="icon-minus-sign-alt icon-" >&nbsp;</i></td><?php } ?>
      </tr>
        <tr>
          <th>Kostenübernahme für Inspektion inkl. UVV nach dem 1. und 2. Versicherungsjahr</th>
          <?php if(in_array('basis',$verspraemien)) { ?><td><i class="icon-minus-sign-alt icon-" >&nbsp;</i></td><?php } ?>
          <?php if(in_array('premium',$verspraemien)) { ?><td><i class="icon-minus-sign-alt icon-" >&nbsp;</i></td><?php } ?>
          <?php if(in_array('premiumPlus',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
          <?php if(in_array('premiumPlusOV',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        </tr>
        <tr>
          <th>Mobilitätsschutz</th>
          <?php if(in_array('basis',$verspraemien)) { ?><td><i class="icon-minus-sign-alt icon-" >&nbsp;</i></td><?php } ?>
          <?php if(in_array('premium',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
          <?php if(in_array('premiumPlus',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
          <?php if(in_array('premiumPlusOV',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        </tr>
        <tr>
          <th>Krankheitsbedingtem Ausfall</th>
          <?php if(in_array('basis',$verspraemien)) { ?><td><i class="icon-minus-sign-alt icon-" >&nbsp;</i></td><?php } ?>
          <?php if(in_array('premium',$verspraemien)) { ?><td><i class="icon-minus-sign-alt icon-" >&nbsp;</i></td><?php } ?>
          <?php if(in_array('premiumPlus',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
          <?php if(in_array('premiumPlusOV',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        </tr>
        <tr>
          <th>Elternzeit</th>
          <?php if(in_array('basis',$verspraemien)) { ?><td><i class="icon-minus-sign-alt icon-" >&nbsp;</i></td><?php } ?>
          <?php if(in_array('premium',$verspraemien)) { ?><td><i class="icon-minus-sign-alt icon-" >&nbsp;</i></td><?php } ?>
          <?php if(in_array('premiumPlus',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
          <?php if(in_array('premiumPlusOV',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        </tr>
        <tr>
          <th>Ausscheiden des Mitarbeiters</th>
          <?php if(in_array('basis',$verspraemien)) { ?><td><i class="icon-minus-sign-alt icon-" >&nbsp;</i></td><?php } ?>
          <?php if(in_array('premium',$verspraemien)) { ?><td><i class="icon-minus-sign-alt icon-" >&nbsp;</i></td><?php } ?>
          <?php if(in_array('premiumPlus',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
          <?php if(in_array('premiumPlusOV',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        </tr>
        <tr>
          <th>Unfalltod</th>
          <?php if(in_array('basis',$verspraemien)) { ?><td><i class="icon-minus-sign-alt icon-" >&nbsp;</i></td><?php } ?>
          <?php if(in_array('premium',$verspraemien)) { ?><td><i class="icon-minus-sign-alt icon-" >&nbsp;</i></td><?php } ?>
          <?php if(in_array('premiumPlus',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
          <?php if(in_array('premiumPlusOV',$verspraemien)) { ?><td><i class="icon-check-sign icon-" >&nbsp;</i></td><?php } ?>
        </tr>
      <tr class="additional">
        <th>Selbstbeteiligung</th>
        <?php if(in_array('basis',$verspraemien)) { ?><td>40 Euro brutto pro Schadensfall</td><?php } ?>
        <?php if(in_array('premium',$verspraemien)) { ?><td>keine</td><?php } ?>
        <?php if(in_array('premiumPlus',$verspraemien)) { ?><td>keine</td><?php } ?>
        <?php if(in_array('premiumPlusOV',$verspraemien)) { ?><td>keine</td><?php } ?>
      </tr>
      <tr>
        <th>Bagatellschadensregelung</th>
        <?php if(in_array('basis',$verspraemien)) { ?><td>Bagatellschäden bis zu einem Betrag von 75 Euro werden nicht erstattet</td><?php } ?>
        <?php if(in_array('premium',$verspraemien)) { ?><td>keine</td><?php } ?>
        <?php if(in_array('premiumPlus',$verspraemien)) { ?><td>keine</td><?php } ?>
        <?php if(in_array('premiumPlusOV',$verspraemien)) { ?><td>keine</td><?php } ?>
      </tr>
    </tbody>
  </table>
</div>
