<tr id="lur_content_ebike" class="lur_content_div">
  <td class="lur_content_label lur_content_input_row" colspan="3">
    <?php if ($siteOptions['has_reverse_calculator']) { ?>
      <div style="text-align:left;margin: 0px 0px 20px;line-height: 1.3">
        <div style="display:flex;align-items:center;justify-content: space-between;">
          <div>Sie haben von Ihrem Arbeitgeber eine maximale Leasingrate? Berechnen sie hier ihren maximalen Bikepreis.</div>
          <div id="lur_reverse_switch" class="switch" style="float: none;">
            <span class="lur_bullet_basic opt-true" id="lur_reverse_ja">Ja</span>
            <span class="lur_bullet_basic opt-false" id="lur_reverse_nein">Nein</span>
          </div>
        </div>
        <div id="lur_reverse_calc" style="display:none;">
          <div style="display:flex;align-items: center; gap: 10px;margin: 5px 0px;">
            <div class="currency_field" style="margin:0">
              <span class="currency_field_symbol" style="top: 4px">€</span>
              <input style="line-height: 32px; height: 32px;margin:0" id="lur_max_bike_price" type="number" min="0" step="1" />
            </div>
            <button style="white-space: nowrap;margin: 0;" id="lur_max_bike_price_button" class="btn button skyblue small">berechnen</button>
            <div style="display:none" id="lur_max_bike_price_result">
              Ihr maximaler Bikepreis ist <strong style="color: black" id="lur_max_bike_price_result_number"></strong> €&nbsp;
              <button style="white-space: nowrap;margin: 0;" id="lur_takeover_bike_price_button" class="btn button skyblue small">übernehmen</button>
            </div>
          </div>
        </div>
      </div>
    <?php } ?>
    <div class="lur_content_heading">
      Bikes
    </div>
    <div class="lur_content_container">
      <div class="lur_content_row lur_content_row_head">
        <div class="lur_content_col">

        </div>
        <div class="lur_content_col">
          Bike
        </div>
        <div class="lur_content_col nodisplay">
          <a href="#" class="lur_open_popout lur_open_popout_bikes" data-ref="anzahl">
            Anzahl
          </a>
        </div>
        <div class="lur_content_col">
          Bike-Kaufpreis <br /><span style="font-size:11px">(inkl. Zubehör und MwSt.)</span>
        </div>
        <div class="lur_content_col">
          Bruttolistenpreis (UVP) Bike <br /><span style="font-size:11px">(inkl. Zubehör und MwSt.)</span>
        </div>
        <div class="lur_content_col lur_content_col_type <?php if ((int)$siteOptions["bikeswitch"] < 1) echo 'nodisplay'; ?>">
          Typ
        </div>
      </div>
      <div class="lur_content_row lur_content_row_bike">
        <span class="button_wrap lur_remove_bike_wrap">Bike(s) entfernen <a href="#removeBike" class="lur_remove_bike round button small skyblue">-</a></span>
        <div class="lur_content_col bikeNo">
          # 1
        </div>
        <div class="lur_content_col nodisplay">
          <span class="lur_content_col_label">Anzahl</span>
          <input type="number" class="lur_bike_count" min="1" value="1" />
        </div>
        <div class="lur_content_col">
          <span class="lur_content_col_label">Bike-Kaufpreis (inkl. Zubehör und MwSt.)</span>
          <div class="currency_field">
            <span class="currency_field_symbol">€</span>
            <input type="number" class="lur_bike_price" id="price" min="<?php echo $minBikePrice; ?>" max="<?php echo $maxBikePrice; ?>" value="<?= $price; ?>" />
          </div>
        </div>
        <div class="lur_content_col">
          <span class="lur_content_col_label">Bruttolistenpreis (UVP) Bike (inkl. Zubehör und MwSt.)</span>
          <div class="currency_field">
            <span class="currency_field_symbol">€</span>
            <input type="number" class="lur_bike_price-uvp" id="price-uvp" min="0" value="<?= $priceUvp; ?>" />
          </div>
        </div>
        <div class="lur_content_col lur_content_col_type">
          <span class="lur_content_col_label">Typ</span>
          <select class="lur_type">
            <option value="0"> E-Bike</option>
            <option value="1">Fahrrad</option>
          </select>
        </div>
      </div>
      <div class="lur_content_row lur_content_row_add">
        <span class="button_wrap">Bike(s) hinzufügen <a href="#addBike" class="lur_add_bike button small round skyblue">+</a></span>
      </div>
    </div>
  </td>
</tr>

<?php if ($siteOptions['prefix'] === 'hkd') { ?>
  <tr class="lur_content_div">
    <td class="lur_content_label lur_footer lur_footer_1" colspan="2">
      Leasingrate ohne Gehaltsumwandlung (inkl.
      <?php if ($siteOptions['prefix'] === 'zeg') { ?><a href="https://www.eurorad.de/versicherung" class="info_icon" target="_blank"><?php } else { ?><a href="#" class="lur_open_popout" data-ref="insurance-table"><?php } ?><span class="lur_content_paket lur_content_paket-premium-plus">PremiumPLUS</span><span class="lur_content_paket lur_content_paket-premium">Premium</span><span class="lur_content_paket lur_content_paket-basis">Basis</span><span class="lur_content_paket lur_content_paket-alt">Rundum-Sorglos</span>-Paket</a>)
    </td>
    <td class="lur_footer lur_footer_erg lur_footer_1">
      <div class="lur_leasing_monat_brutto"><span>inkl. MwSt.</span> <span id="lur_summe_monat" class="lur_summe_monat"> -- </span></div>
    </td>
  </tr>
  <tr class="lur_content_div">
    <td class="lur_content_label lur_content_input_row" style="padding: 0" colspan="3">
      <div style="text-align: left; padding-top: 20px;">
        <h4>Berechnen Sie hier die Kosten mit Gehaltsumwandlung</h4>
      </div>
    </td>
  </tr>
<?php } ?>