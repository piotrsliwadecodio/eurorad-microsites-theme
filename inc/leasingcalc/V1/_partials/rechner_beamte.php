<tr id="lur_content_beamte" class="lur_content_div" <?php if($siteOptions['opt_beamte'] !== '1') echo 'style="display: none"'; ?>>
   <td class="lur_content_label">Sind Sie verbeamtet?</td>
   <td class="lur_content_input_row" colspan="2">
      <div id="lur_beamte_switch" class="switch <?php if($siteOptions['calctype'] === "3") echo 'opt-yes'; else echo "opt-no"; ?>">
         <span id="lur_beamte_ja" class="lur_bullet_basic opt-true">Ja</span>
         <span id="lur_beamte_nein" class="lur_bullet_basic opt-false"> Nein</span>
      </div>
   </td>
</tr>
