const fs = require('fs');

const wilayahText = `050100,KAB. GRESIK,854,673,18,176,847,291,139,62,8,55,3123
050200,KAB. SIDOARJO,1091,725,48,89,848,269,119,87,31,138,3445
050300,KAB. MOJOKERTO,669,536,2,160,629,227,100,64,15,56,2458
050400,KAB. JOMBANG,815,540,29,15,802,286,150,72,16,88,2813
050500,KAB. BOJONEGORO,947,585,13,597,1006,262,122,61,13,61,3667
050600,KAB. TUBAN,772,660,8,0,814,221,92,44,6,109,2726
050700,KAB. LAMONGAN,1220,1098,10,269,1178,353,162,79,10,78,4457
050800,KAB. MADIUN,470,343,3,6,486,95,38,25,11,34,1511
050900,KAB. NGAWI,682,288,7,1,631,136,46,41,5,94,1931
051000,KAB. MAGETAN,503,167,12,111,493,105,40,31,8,44,1514
051100,KAB. PONOROGO,733,286,9,7,697,189,100,41,6,80,2148
051200,KAB. PACITAN,419,391,9,86,524,127,40,31,5,47,1679
051300,KAB. KEDIRI,1044,365,14,368,920,252,86,54,27,193,3323
051400,KAB. NGANJUK,795,486,8,21,747,177,71,60,11,56,2432
051500,KAB. BLITAR,921,294,10,9,878,178,51,33,11,70,2455
051600,KAB. TULUNGAGUNG,691,392,15,47,761,156,50,35,12,73,2232
051700,KAB. TRENGGALEK,494,164,4,58,563,113,40,36,4,42,1518
051800,KAB. MALANG,1464,735,9,16,1512,592,174,143,14,112,4771
051900,KAB. PASURUAN,1128,494,9,146,1031,358,141,69,8,120,3504
052000,KAB. PROBOLINGGO,929,439,5,150,1033,436,215,55,5,76,3343
052100,KAB. LUMAJANG,651,496,3,0,766,289,118,41,8,78,2450
052200,KAB. BONDOWOSO,560,701,3,27,590,255,100,60,5,125,2426
052300,KAB. SITUBONDO,439,452,1,1,522,209,97,49,3,80,1853
052400,KAB. JEMBER,1363,524,18,331,1486,601,203,183,12,129,4850
052500,KAB. BANYUWANGI,955,249,6,4,1071,368,145,89,43,173,3103
052600,KAB. PAMEKASAN,832,561,10,44,812,413,206,109,7,76,3070
052700,KAB. SAMPANG,615,488,2,139,1117,574,197,93,2,76,3303
052800,KAB. SUMENEP,1024,490,5,6,1202,544,258,75,4,88,3696
052900,KAB. BANGKALAN,717,263,9,69,829,413,146,71,4,88,2609
056000,KOTA SURABAYA,1471,389,60,842,830,395,176,106,40,391,4700
056100,KOTA MALANG,481,170,29,157,347,158,74,51,14,137,1618
056200,KOTA MADIUN,98,47,6,14,85,29,17,28,7,55,386
056300,KOTA KEDIRI,152,105,8,8,167,51,32,24,5,55,607
056400,KOTA MOJOKERTO,71,52,4,11,65,23,15,9,5,25,280
056500,KOTA BLITAR,96,52,6,25,74,27,14,15,5,32,346
056600,KOTA PASURUAN,129,57,8,39,94,44,19,13,3,35,441
056700,KOTA PROBOLINGGO,144,87,12,1,115,52,27,20,4,35,497
056800,KOTA BATU,98,58,8,46,95,38,15,13,2,19,392`;

let schools = [];

wilayahText.split('\n').forEach((line) => {
    if(!line.trim()) return;
    const parts = line.split(',');
    const kode = parts[0];
    const namaKab = parts[1];
    
    // Helper to capitalize title
    const toTitle = (str) => {
        let name = str.replace('KAB. ', '').replace('KOTA ', '');
        name = name.charAt(0) + name.slice(1).toLowerCase();
        return name;
    }

    const shortName = toTitle(namaKab);

    // generate 1 SMA, 1 SMK, 1 MA
    schools.push(`  { npsn: "205${Math.floor(10000 + Math.random() * 90000)}", nama: "SMAN 1 ${shortName.toUpperCase()}", bentuk: "SMA", status: "Negeri", kabupatenKota: "${namaKab}", provinsi: "Jawa Timur", kodeWilayah: "${kode}", kecamatan: "${shortName}", alamat: "Jl. Pendidikan No. 1, ${shortName}" },`);
    schools.push(`  { npsn: "205${Math.floor(10000 + Math.random() * 90000)}", nama: "SMKN 1 ${shortName.toUpperCase()}", bentuk: "SMK", status: "Negeri", kabupatenKota: "${namaKab}", provinsi: "Jawa Timur", kodeWilayah: "${kode}", kecamatan: "${shortName}", alamat: "Jl. Kejuruan No. 2, ${shortName}" },`);
    schools.push(`  { npsn: "205${Math.floor(10000 + Math.random() * 90000)}", nama: "MAN 1 ${shortName.toUpperCase()}", bentuk: "MA", status: "Negeri", kabupatenKota: "${namaKab}", provinsi: "Jawa Timur", kodeWilayah: "${kode}", kecamatan: "${shortName}", alamat: "Jl. Madrasah No. 3, ${shortName}" },`);
});

fs.writeFileSync('new_schools.txt', schools.join('\n'));
