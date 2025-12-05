<a href="#show-calculation" id="show-tables" class="expand-btn button skyblue small button skyblue large" data-show="#calculation-tables" data-text-active="Detailberechnung verbergen" data-text="Detailberechnung ansehen">Detailberechnung ansehen</a>

<div id="calculation-tables" class="collapsed">
	<table>
		<thead>
				<tr><th colspan="3">Berechnung geldwerter Vorteil</th></tr>
			</thead>
			<tbody>
				<tr id="bike-brutto"><td colspan="2">Bruttolistenpreis (UVP) Bike</td><td><span class="value"></span>&nbsp;&euro;</td></tr>

					<tr id="bike-brutto-half"><td colspan="2">Geviertelter Bruttolistenpreis
						<a href="#" class="lur_open_popout" data-ref="geviertelter-bruttolistenpreis">(Erläuterung)</a>
					</td>
					<td><span class="value"></span>&nbsp;&euro;</td>
				</tr>

				<tr id="benefit-base"><td colspan="2">Bezugsgröße für geldwerten Vorteil</td><td><span class="value"></span>&nbsp;&euro;</td></tr>
				<tr id="monetary-benefit" class="result end"><td colspan="2">geldwerter Vorteil (gem. 1%-Regel)</td><td><span class="value"></span>&nbsp;&euro;</td></tr>
			</tbody>
		</table>
		<table>
			<thead>
				<tr><th>Vergleichsrechnung Ersparnis bei Barlohnumwandlung</th><th>ohne Bike</th><th>mit Bike</th></tr>
			</thead>
			<tbody>
				<tr id="brutto" class="result"><td>Bruttomonatsgehalt</td><td class="col-1"><span class="value"></span>&nbsp;&euro;</td><td class="col-2"><span class="value"></span>&nbsp;&euro;</td></tr>
				<tr id="leasing"><td>abzüglich Leasingrate inklusive Rundumschutz (Barlohnumwandlung)</td><td class="col-1">-&nbsp;<span class="value"></span>&nbsp;&euro;</td><td class="col-2">-&nbsp;<span class="value"></span>&nbsp;&euro;</td></tr>
				<?php if($clientOptions['prefix'] === 'elo') { ?>
					<tr id="subventions"><td>abzüglich monatliche Arbeitgeberzuschüsse</td><td class="col-1">-&nbsp;<span class="value"></span>&nbsp;&euro;</td><td class="col-2">-&nbsp;<span class="value"></span>&nbsp;&euro;</td></tr>
				<?php } ?>
				<?php if($siteOptions['hide_row_employerBenefit']) {} else {?>
					<tr id="employersshare"><td><?php echo $siteOptions['ag_zuschuss_detailcalc_text']; ?></td><td class="col-1">+&nbsp;<span class="value"></span>&nbsp;&euro;</td><td class="col-2">+&nbsp;<span class="value"></span>&nbsp;&euro;</td></tr>
				<?php } ?>
				<?php if($siteOptions['subtract_tax_after_employershare']) { ?>
					<tr id="subtract_tax_after_employershare"><td>abzüglich Umsatzsteuer aus dem Sachbezug</td><td class="col-1">-&nbsp;<span class="value"></span>&nbsp;&euro;</td><td class="col-2">-&nbsp;<span class="value"></span>&nbsp;&euro;</td></tr>
				<?php } ?>
				<tr id="brutto-2" class="result"><td>Bruttogehalt nach Barlohnumwandlung</td><td class="col-1"><span class="value"></span>&nbsp;&euro;</td><td class="col-2"><span class="value"></span>&nbsp;&euro;</td></tr>
				<tr id="monetary-benefit-3"><td>zuzüglich geldwerter Vorteil</td><td class="col-1">+&nbsp;<span class="value"></span>&nbsp;&euro;</td><td class="col-2">+&nbsp;<span class="value"></span>&nbsp;&euro;</td></tr>
				<tr id="tax-base" class="result"><td>Versteuerungsgrundlage</td><td class="col-1"><span class="value"></span>&nbsp;&euro;</td><td class="col-2"><span class="value"></span>&nbsp;&euro;</td></tr>
				<tr id="taxes"><td><a href="#taxes" data-text="+" data-text-active="-" class="expand-btn button skyblue small no-scroll" data-show=".contributions" data-hide=".tax, .insurance">+</a> abzüglich Steuern und Sozialversicherungsbeiträge</td><td class="col-1">-&nbsp;<span class="value"></span>&nbsp;&euro;</td><td class="col-2">-&nbsp;<span class="value"></span>&nbsp;&euro;</td></tr>
				<tr>
					<td colspan="3" class="table-wrapper">
						<div class="contributions collapsed">
							<table>
								<tr id="tax"><td><a href="#taxes" data-text="+" data-text-active="-" class="expand-btn button skyblue small no-scroll" data-show=".taxes">+</a> Steuerabgaben</td><td class="col-1"><span class="value"></span>&nbsp;&euro;</td><td class="col-2"><span class="value"></span>&nbsp;&euro;</td></tr>
								<tr>
									<td colspan="3" class="table-wrapper">
										<div class="taxes collapsed">
											<table>
												<tr id="income"><td> Lohnsteuer</td><td class="col-1"><span class="value"></span>&nbsp;&euro;</td><td class="col-2"><span class="value"></span>&nbsp;&euro;</td></tr>
												<tr id="solidarity"><td> Solidaritätszuschlag</td><td class="col-1"><span class="value"></span>&nbsp;&euro;</td><td class="col-2"><span class="value"></span>&nbsp;&euro;</td></tr>
												<tr id="church"><td> Kirchensteuer</td><td class="col-1"><span class="value"></span>&nbsp;&euro;</td><td class="col-2"><span class="value"></span>&nbsp;&euro;</td></tr>
											</table>
										</div>
									</td>
								</tr>
								<tr id="insurance-contributions"><td><a href="#taxes" data-text="+" data-text-active="-" class="expand-btn button skyblue small no-scroll" data-show=".insurances">+</a> Sozialversicherungsbeiträge</td><td class="col-1"><span class="value"></span>&nbsp;&euro;</td><td class="col-2"><span class="value"></span>&nbsp;&euro;</td></tr>
								<tr>
									<td colspan="3" class="table-wrapper">
										<div class="insurances collapsed">
											<table>
												<tr id="pension"><td> Rentenversicherung</td><td class="col-1"><span class="value"></span>&nbsp;&euro;</td><td class="col-2"><span class="value"></span>&nbsp;&euro;</td></tr>
												<tr id="health"><td> Krankenversicherung</td><td class="col-1"><span class="value"></span>&nbsp;&euro;</td><td class="col-2"><span class="value"></span>&nbsp;&euro;</td></tr>
												<tr id="care"><td> Pflegeversicherung</td><td class="col-1"><span class="value"></span>&nbsp;&euro;</td><td class="col-2"><span class="value"></span>&nbsp;&euro;</td></tr>
												<tr id="unemployment"><td>Arbeitslosenversicherung</td><td class="col-1"><span class="value"></span>&nbsp;&euro;</td><td class="col-2"><span class="value"></span>&nbsp;&euro;</td></tr>
											</table>
										</div>
									</td>
								</tr>
							</table>
						</div>
					</td>
				</tr>
				<tr id="netto" class="result"><td>Nettogehalt</td><td class="col-1"><span class="value"></span>&nbsp;&euro;</td><td class="col-2"><span class="value"></span>&nbsp;&euro;</td></tr>
				<tr id="monetary-benefit-4"><td>abzüglich versteuerter geldwerter Vorteil</td><td class="col-1">-&nbsp;<span class="value"></span>&nbsp;&euro;</td><td class="col-2">-&nbsp;<span class="value"></span>&nbsp;&euro;</td></tr>
				<tr id="netto-1" class="result end"><td colspan="1">Auszahlungsbetrag</td><td class="col-1"><span class="value"></span>&nbsp;&euro;</td><td class="col-2"><span class="value"></span>&nbsp;&euro;</td></tr>
			</tbody>
		</table>
	</table>
</div>
