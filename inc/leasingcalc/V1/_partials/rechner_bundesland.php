<tr id="lur_content_bula" class="lur_content_div connectToAbove">
   <td class="lur_content_label">Bundesland</td>
   <td class="lur_content_input_row" colspan="2">
      <select name="in_bundesland" id="lur_bundesland">
         <option value="WAHL">bitte Bundesland wählen</option>
         <?php foreach($states as $state) { ?>
            <option<?php if ($currentState === $state['short']) echo ' selected'; ?> value="<?php echo $state['short']; ?>"><?php echo $state['full']; ?></option>
         <?php } ?>
      </select>
   </td>
</tr>
