export const CalculosFinancieros = {
	/**
	 * Calcula el subtotal a partir del total con IGV incluido.
	 * @param {number} total - Monto total con IGV.
	 * @returns {number} Subtotal (precio sin IGV).
	*/
	calcularSubtotal(total) {
		return parseFloat((total / 1.18).toFixed(2));
	},

	/**
	 * Calcula el IGV exacto a partir del subtotal y el total.
	 * @param {number} subtotal - Precio sin IGV.
	 * @param {number} total - Precio con IGV.
	 * @returns {number} IGV calculado.
	*/
	calcularIGV(total) {
		return parseFloat((total - this.calcularSubtotal(total)).toFixed(2));
	}
};