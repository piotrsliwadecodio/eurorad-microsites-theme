<tr id="lur_content_kraka" class="lur_content_div" <?php if($siteOptions['calctype'] === "3") echo 'style="display: none"'; ?>>
   <td class="lur_content_label">Krankenkasse</td>
   <td class="lur_content_input_row" colspan="2">
      <select name="krankenkasse" id="lur_krankenkasse">
         <option value="1">gesetzliche Krankenversicherung</option>
         <option value="2" >private Krankenversicherung ohne Arbeitgeberzuschuss</option>
         <option value="3">private Krankenversicherung mit Arbeitgeberzuschuss</option>
      </select>
   </td>
</tr>
<tr id="lur_content_kvzusatz" class="lur_content_div connectToAbove" <?php if($siteOptions['calctype'] === "3") echo 'style="display: none"'; ?>>
   <td class="lur_content_label">KV-Zusatzbeitrag
     <a href="#" class="lur_open_popout" data-ref="kv-zusatzbeitrag">(Erläuterung)
     </a>
   </td>
   <td class="lur_content_input_row" colspan="2">
      <?php 
         $average_kv_addition = $siteOptions['kv_addition'] ? $siteOptions['kv_addition'] : 1.7;
      ?>
      <input type="number" id="lur_kvzusatz" min="0" value="<?php echo $average_kv_addition; ?>">
   </td>
</tr>
<tr id="lur_content_kassensatz" class="lur_content_div">
   <td class="lur_content_label">Kassensatz<br>(nur gesetzl.)</td>
   <td class="lur_content_input_row" colspan="2">
      <input type="number" min="0" max="50" step="0.01" value="15.5" name="lur_kassensatz">
   </td>
</tr>
