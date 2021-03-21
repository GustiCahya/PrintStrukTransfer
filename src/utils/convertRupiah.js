export function convertRupiah(num){
    num = Math.round(Number(num));
	return (!isNaN(num)) ? (num).toLocaleString("id", {
		style: "currency",
		currency: "IDR"
	}).replace(/,00$/gi, "") : "Rp 0";
}

export function addSeparator(num){
	num = Number(num);
	return (num).toLocaleString("id");
}

export function convertRupiahtoNumber(str){
	if(str){
		str = String(str)
		str = str.replace(/Rp/gi, "");
		str = str.replace(/\s/gi, "");
		str = str.replace(/\./gi, "");
		str = str.replace(/(,)[0-9]+$/gi, "");
		return Number(str);
	}
	return 0;
}