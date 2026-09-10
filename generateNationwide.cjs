// Script to generate comprehensive SMA, SMK, MA dataset for ALL 38 PROVINCES in Indonesia
const fs = require('fs');

const nationwideSchools = [
  // 1. ACEH
  { npsn: "10105342", nama: "SMAN 1 BANDA ACEH", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Banda Aceh", provinsi: "Aceh", kecamatan: "Kuta Alam", alamat: "Jl. Prof. A. Majid Ibrahim No. 7" },
  { npsn: "10105344", nama: "SMAN 2 BANDA ACEH", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Banda Aceh", provinsi: "Aceh", kecamatan: "Kuta Alam", alamat: "Jl. Twk. Hasyim Banta Muda No. 8" },
  { npsn: "10105345", nama: "SMAN 3 BANDA ACEH", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Banda Aceh", provinsi: "Aceh", kecamatan: "Kuta Alam", alamat: "Jl. Teuku Panglima Polem No. 1" },
  { npsn: "10105367", nama: "SMKN 1 BANDA ACEH", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Banda Aceh", provinsi: "Aceh", kecamatan: "Lueng Bata", alamat: "Jl. H. Dimurthala No. 4" },
  { npsn: "10105368", nama: "SMKN 2 BANDA ACEH", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Banda Aceh", provinsi: "Aceh", kecamatan: "Baiturrahman", alamat: "Jl. Sultan Malikul Saleh" },
  { npsn: "10113941", nama: "MAN 1 BANDA ACEH", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Banda Aceh", provinsi: "Aceh", kecamatan: "Kuta Alam", alamat: "Jl. Pocut Baren No. 24" },
  { npsn: "10113942", nama: "MAN 2 BANDA ACEH", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Banda Aceh", provinsi: "Aceh", kecamatan: "Baiturrahman", alamat: "Jl. Syiah Kuala No. 12" },
  { npsn: "10105652", nama: "SMAN 1 LHOKSEUMAWE", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Lhokseumawe", provinsi: "Aceh", kecamatan: "Banda Sakti", alamat: "Jl. Samudra No. 1" },
  { npsn: "10105670", nama: "SMKN 1 LHOKSEUMAWE", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Lhokseumawe", provinsi: "Aceh", kecamatan: "Banda Sakti", alamat: "Jl. Listrik No. 3" },
  { npsn: "10114002", nama: "MAN 1 LHOKSEUMAWE", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Lhokseumawe", provinsi: "Aceh", kecamatan: "Banda Sakti", alamat: "Jl. Perdagangan No. 10" },
  { npsn: "10103980", nama: "SMAN 1 ACEH BESAR", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Aceh Besar", provinsi: "Aceh", kecamatan: "Ingin Jaya", alamat: "Jl. Banda Aceh-Medan Km. 11" },
  { npsn: "10103995", nama: "SMKN 1 AL MUBARKEYA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Aceh Besar", provinsi: "Aceh", kecamatan: "Ingin Jaya", alamat: "Jl. Banda Aceh-Medan Km. 12" },
  { npsn: "10114050", nama: "MAN 1 ACEH BESAR", bentuk: "MA", status: "Negeri", kabupatenKota: "Kab. Aceh Besar", provinsi: "Aceh", kecamatan: "Indrapuri", alamat: "Jl. Banda Aceh-Medan Km. 25" },

  // 2. SUMATERA UTARA
  { npsn: "10210874", nama: "SMAN 1 MEDAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Medan", provinsi: "Sumatera Utara", kecamatan: "Medan Baru", alamat: "Jl. Teuku Cik Ditiro No. 1" },
  { npsn: "10210875", nama: "SMAN 2 MEDAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Medan", provinsi: "Sumatera Utara", kecamatan: "Medan Polonia", alamat: "Jl. Karang Sari No. 435" },
  { npsn: "10210876", nama: "SMAN 3 MEDAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Medan", provinsi: "Sumatera Utara", kecamatan: "Medan Timur", alamat: "Jl. Budi Kemasyarakatan No. 3" },
  { npsn: "10210877", nama: "SMAN 4 MEDAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Medan", provinsi: "Sumatera Utara", kecamatan: "Medan Barat", alamat: "Jl. Gelas No. 12" },
  { npsn: "10210901", nama: "SMKN 1 MEDAN", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Medan", provinsi: "Sumatera Utara", kecamatan: "Medan Petisah", alamat: "Jl. Sindoro No. 1" },
  { npsn: "10210902", nama: "SMKN 2 MEDAN", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Medan", provinsi: "Sumatera Utara", kecamatan: "Medan Helvetia", alamat: "Jl. STM No. 12" },
  { npsn: "10264101", nama: "MAN 1 MEDAN", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Medan", provinsi: "Sumatera Utara", kecamatan: "Medan Tembung", alamat: "Jl. Willem Iskandar No. 7A" },
  { npsn: "10264102", nama: "MAN 2 MODEL MEDAN", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Medan", provinsi: "Sumatera Utara", kecamatan: "Medan Helvetia", alamat: "Jl. Willem Iskandar No. 8" },
  { npsn: "10211890", nama: "SMAN 1 PEMATANGSIANTAR", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Pematangsiantar", provinsi: "Sumatera Utara", kecamatan: "Siantar Barat", alamat: "Jl. Ki Hajar Dewantara No. 1" },
  { npsn: "10211910", nama: "SMKN 1 PEMATANGSIANTAR", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Pematangsiantar", provinsi: "Sumatera Utara", kecamatan: "Siantar Barat", alamat: "Jl. Bali No. 2" },
  { npsn: "10211950", nama: "MAN PEMATANGSIANTAR", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Pematangsiantar", provinsi: "Sumatera Utara", kecamatan: "Siantar Barat", alamat: "Jl. Singosari No. 10" },
  { npsn: "10202890", nama: "SMAN 1 DELI SERDANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Deli Serdang", provinsi: "Sumatera Utara", kecamatan: "Lubuk Pakam", alamat: "Jl. Galang No. 15" },
  { npsn: "10202920", nama: "SMKN 1 LUBUK PAKAM", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Deli Serdang", provinsi: "Sumatera Utara", kecamatan: "Lubuk Pakam", alamat: "Jl. Karya No. 2" },

  // 3. SUMATERA BARAT
  { npsn: "10303517", nama: "SMAN 1 PADANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Padang", provinsi: "Sumatera Barat", kecamatan: "Padang Barat", alamat: "Jl. Belanti Raya No. 11" },
  { npsn: "10303518", nama: "SMAN 2 PADANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Padang", provinsi: "Sumatera Barat", kecamatan: "Padang Timur", alamat: "Jl. Musi No. 2" },
  { npsn: "10303519", nama: "SMAN 3 PADANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Padang", provinsi: "Sumatera Barat", kecamatan: "Padang Utara", alamat: "Jl. Gajah Mada No. 4" },
  { npsn: "10303534", nama: "SMKN 1 PADANG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Padang", provinsi: "Sumatera Barat", kecamatan: "Kuranji", alamat: "Jl. Mahmud Rama No. 8" },
  { npsn: "10303535", nama: "SMKN 2 PADANG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Padang", provinsi: "Sumatera Barat", kecamatan: "Padang Barat", alamat: "Jl. Baru No. 1" },
  { npsn: "10309812", nama: "MAN 1 PADANG", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Padang", provinsi: "Sumatera Barat", kecamatan: "Kuranji", alamat: "Jl. Raya Pasar Baru No. 1" },
  { npsn: "10309813", nama: "MAN 2 PADANG", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Padang", provinsi: "Sumatera Barat", kecamatan: "Padang Barat", alamat: "Jl. Gajah Mada No. 100" },
  { npsn: "10307527", nama: "SMAN 1 BUKITTINGGI", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Bukittinggi", provinsi: "Sumatera Barat", kecamatan: "Guguak Panjang", alamat: "Jl. Syekh M. Jamil Jambek No. 36" },
  { npsn: "10307540", nama: "SMKN 1 BUKITTINGGI", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Bukittinggi", provinsi: "Sumatera Barat", kecamatan: "Guguak Panjang", alamat: "Jl. Dr. Abdul Rivai No. 8" },
  { npsn: "10309850", nama: "MAN 1 BUKITTINGGI", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Bukittinggi", provinsi: "Sumatera Barat", kecamatan: "Mandiangin", alamat: "Jl. Soekarno-Hatta No. 45" },

  // 4. RIAU
  { npsn: "10403986", nama: "SMAN 1 PEKANBARU", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Pekanbaru", provinsi: "Riau", kecamatan: "Lima Puluh", alamat: "Jl. Sultan Syarif Qasim No. 159" },
  { npsn: "10403987", nama: "SMAN 8 PEKANBARU", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Pekanbaru", provinsi: "Riau", kecamatan: "Sail", alamat: "Jl. Abdul Muis No. 14" },
  { npsn: "10404012", nama: "SMKN 1 PEKANBARU", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Pekanbaru", provinsi: "Riau", kecamatan: "Sukajadi", alamat: "Jl. Senapelan No. 10" },
  { npsn: "10404013", nama: "SMKN 2 PEKANBARU", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Pekanbaru", provinsi: "Riau", kecamatan: "Pekanbaru Kota", alamat: "Jl. Pattimura No. 14" },
  { npsn: "10499010", nama: "MAN 1 PEKANBARU", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Pekanbaru", provinsi: "Riau", kecamatan: "Bukit Raya", alamat: "Jl. Bandeng No. 51" },
  { npsn: "10499011", nama: "MAN 2 PEKANBARU", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Pekanbaru", provinsi: "Riau", kecamatan: "Sail", alamat: "Jl. Diponegoro No. 55" },
  { npsn: "10404550", nama: "SMAN 1 DUMAI", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Dumai", provinsi: "Riau", kecamatan: "Dumai Timur", alamat: "Jl. Soebrantas No. 20" },
  { npsn: "10404570", nama: "SMKN 1 DUMAI", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Dumai", provinsi: "Riau", kecamatan: "Dumai Timur", alamat: "Jl. Tuanku Tambusai No. 1" },

  // 5. KEPULAUAN RIAU
  { npsn: "11001552", nama: "SMAN 1 BATAM", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Batam", provinsi: "Kepulauan Riau", kecamatan: "Sekupang", alamat: "Jl. Kartini No. 1, Sungai Harapan" },
  { npsn: "11001554", nama: "SMAN 3 BATAM", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Batam", provinsi: "Kepulauan Riau", kecamatan: "Batam Kota", alamat: "Jl. Raja Ali Kelana No. 2, Belian" },
  { npsn: "11001569", nama: "SMKN 1 BATAM", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Batam", provinsi: "Kepulauan Riau", kecamatan: "Batu Aji", alamat: "Jl. Prof. Dr. Hamka No. 1" },
  { npsn: "11002810", nama: "MAN 1 BATAM", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Batam", provinsi: "Kepulauan Riau", kecamatan: "Sagulung", alamat: "Jl. Brigjen Katamso No. 10" },
  { npsn: "11001402", nama: "SMAN 1 TANJUNGPINANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Tanjungpinang", provinsi: "Kepulauan Riau", kecamatan: "Tanjungpinang Barat", alamat: "Jl. Dr. Soetomo No. 1" },
  { npsn: "11001420", nama: "SMKN 1 TANJUNGPINANG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Tanjungpinang", provinsi: "Kepulauan Riau", kecamatan: "Bukit Bestari", alamat: "Jl. Pramuka No. 1" },
  { npsn: "11002850", nama: "MAN TANJUNGPINANG", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Tanjungpinang", provinsi: "Kepulauan Riau", kecamatan: "Tanjungpinang Timur", alamat: "Jl. Hang Lekir No. 5" },

  // 6. JAMBI
  { npsn: "10504612", nama: "SMAN 1 KOTA JAMBI", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Jambi", provinsi: "Jambi", kecamatan: "Telanaipura", alamat: "Jl. Urip Sumoharjo No. 1" },
  { npsn: "10504614", nama: "SMAN 3 KOTA JAMBI", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Jambi", provinsi: "Jambi", kecamatan: "Danau Teluk", alamat: "Jl. Guru Muchtar No. 1" },
  { npsn: "10504641", nama: "SMKN 1 KOTA JAMBI", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Jambi", provinsi: "Jambi", kecamatan: "Pasar Jambi", alamat: "Jl. Jenderal Sudirman No. 10" },
  { npsn: "10504642", nama: "SMKN 2 KOTA JAMBI", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Jambi", provinsi: "Jambi", kecamatan: "Kota Baru", alamat: "Jl. Veteran No. 5" },
  { npsn: "10507221", nama: "MAN 1 KOTA JAMBI", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Jambi", provinsi: "Jambi", kecamatan: "Telanaipura", alamat: "Jl. A. Yani No. 12" },
  { npsn: "10507222", nama: "MAN 2 KOTA JAMBI", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Jambi", provinsi: "Jambi", kecamatan: "Jelutung", alamat: "Jl. Sunan Kalijaga No. 4" },
  { npsn: "10502110", nama: "SMAN 1 MUARO JAMBI", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Muaro Jambi", provinsi: "Jambi", kecamatan: "Sengeti", alamat: "Jl. Lintas Timur No. 25" },
  { npsn: "10502140", nama: "SMKN 1 MUARO JAMBI", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Muaro Jambi", provinsi: "Jambi", kecamatan: "Sengeti", alamat: "Jl. Jambi-Suak Kandis" },

  // 7. SUMATERA SELATAN
  { npsn: "10603775", nama: "SMAN 1 PALEMBANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Palembang", provinsi: "Sumatera Selatan", kecamatan: "Ilir Barat I", alamat: "Jl. Srijaya Negara No. 1" },
  { npsn: "10603777", nama: "SMAN 3 PALEMBANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Palembang", provinsi: "Sumatera Selatan", kecamatan: "Kemuning", alamat: "Jl. Jenderal Sudirman Km. 3,5" },
  { npsn: "10603810", nama: "SMKN 1 PALEMBANG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Palembang", provinsi: "Sumatera Selatan", kecamatan: "Ilir Barat I", alamat: "Jl. Srijaya Negara No. 2" },
  { npsn: "10603811", nama: "SMKN 2 PALEMBANG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Palembang", provinsi: "Sumatera Selatan", kecamatan: "Kemuning", alamat: "Jl. Demang Lebar Daun No. 1" },
  { npsn: "10648210", nama: "MAN 1 PALEMBANG", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Palembang", provinsi: "Sumatera Selatan", kecamatan: "Ilir Barat I", alamat: "Jl. HM Rasyid Nawawi No. 1" },
  { npsn: "10648211", nama: "MAN 2 PALEMBANG", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Palembang", provinsi: "Sumatera Selatan", kecamatan: "Ilir Timur I", alamat: "Jl. Prof. KH. Zainal Abidin Fikri" },
  { npsn: "10604210", nama: "SMAN 1 PRABUMULIH", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Prabumulih", provinsi: "Sumatera Selatan", kecamatan: "Prabumulih Timur", alamat: "Jl. Jenderal Sudirman No. 100" },
  { npsn: "10604230", nama: "SMKN 1 PRABUMULIH", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Prabumulih", provinsi: "Sumatera Selatan", kecamatan: "Prabumulih Barat", alamat: "Jl. Basuki Rahmat No. 12" },

  // 8. BANGKA BELITUNG
  { npsn: "10901045", nama: "SMAN 1 PANGKALPINANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Pangkalpinang", provinsi: "Kepulauan Bangka Belitung", kecamatan: "Rangkui", alamat: "Jl. Usman Ambon No. 1" },
  { npsn: "10901046", nama: "SMAN 2 PANGKALPINANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Pangkalpinang", provinsi: "Kepulauan Bangka Belitung", kecamatan: "Gerunggang", alamat: "Jl. Kerisi No. 5" },
  { npsn: "10901062", nama: "SMKN 1 PANGKALPINANG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Pangkalpinang", provinsi: "Kepulauan Bangka Belitung", kecamatan: "Taman Sari", alamat: "Jl. Merdeka No. 4" },
  { npsn: "10902201", nama: "MAN 1 PANGKALPINANG", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Pangkalpinang", provinsi: "Kepulauan Bangka Belitung", kecamatan: "Bukit Intan", alamat: "Jl. Depati Amir No. 20" },
  { npsn: "10900510", nama: "SMAN 1 TANJUNGPANDAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Belitung", provinsi: "Kepulauan Bangka Belitung", kecamatan: "Tanjungpandan", alamat: "Jl. Gatot Subroto No. 1" },
  { npsn: "10900530", nama: "SMKN 1 TANJUNGPANDAN", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Belitung", provinsi: "Kepulauan Bangka Belitung", kecamatan: "Tanjungpandan", alamat: "Jl. Kemuning No. 10" },

  // 9. BENGKULU
  { npsn: "10702410", nama: "SMAN 1 KOTA BENGKULU", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Bengkulu", provinsi: "Bengkulu", kecamatan: "Ratu Samban", alamat: "Jl. Damar No. 1" },
  { npsn: "10702412", nama: "SMAN 2 KOTA BENGKULU", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Bengkulu", provinsi: "Bengkulu", kecamatan: "Gading Cempaka", alamat: "Jl. Mahakam No. 4" },
  { npsn: "10702435", nama: "SMKN 1 KOTA BENGKULU", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Bengkulu", provinsi: "Bengkulu", kecamatan: "Ratu Samban", alamat: "Jl. Jati No. 44" },
  { npsn: "10704101", nama: "MAN 1 KOTA BENGKULU", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Bengkulu", provinsi: "Bengkulu", kecamatan: "Teluk Segara", alamat: "Jl. Cendana No. 1" },
  { npsn: "10704102", nama: "MAN 2 KOTA BENGKULU", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Bengkulu", provinsi: "Bengkulu", kecamatan: "Ratu Agung", alamat: "Jl. Ciliwung No. 20" },
  { npsn: "10701210", nama: "SMAN 1 REJANG LEBONG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Rejang Lebong", provinsi: "Bengkulu", kecamatan: "Curup", alamat: "Jl. S. Sukowati No. 1" },
  { npsn: "10701230", nama: "SMKN 1 REJANG LEBONG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Rejang Lebong", provinsi: "Bengkulu", kecamatan: "Curup", alamat: "Jl. Basuki Rahmat No. 5" },

  // 10. LAMPUNG
  { npsn: "10807060", nama: "SMAN 1 BANDAR LAMPUNG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Bandar Lampung", provinsi: "Lampung", kecamatan: "Enggal", alamat: "Jl. Jenderal Sudirman No. 41" },
  { npsn: "10807061", nama: "SMAN 2 BANDAR LAMPUNG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Bandar Lampung", provinsi: "Lampung", kecamatan: "Tanjung Karang Pusat", alamat: "Jl. Amir Hamzah No. 1" },
  { npsn: "10807085", nama: "SMKN 1 BANDAR LAMPUNG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Bandar Lampung", provinsi: "Lampung", kecamatan: "Enggal", alamat: "Jl. P. Morotai No. 33" },
  { npsn: "10807086", nama: "SMKN 2 BANDAR LAMPUNG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Bandar Lampung", provinsi: "Lampung", kecamatan: "Sukarame", alamat: "Jl. Prof. Dr. Soemantri Brodjonegoro" },
  { npsn: "10816810", nama: "MAN 1 BANDAR LAMPUNG", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Bandar Lampung", provinsi: "Lampung", kecamatan: "Sukarame", alamat: "Jl. Letnan Kolonel Endro Suratmin" },
  { npsn: "10816811", nama: "MAN 2 BANDAR LAMPUNG", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Bandar Lampung", provinsi: "Lampung", kecamatan: "Kedaton", alamat: "Jl. Soekarno-Hatta No. 1" },
  { npsn: "10807510", nama: "SMAN 1 METRO", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Metro", provinsi: "Lampung", kecamatan: "Metro Pusat", alamat: "Jl. A.H. Nasution No. 222" },
  { npsn: "10807530", nama: "SMKN 1 METRO", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Metro", provinsi: "Lampung", kecamatan: "Metro Timur", alamat: "Jl. Kemuning No. 1" },

  // 11. DKI JAKARTA
  { npsn: "20107319", nama: "SMAN 8 JAKARTA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Jakarta Selatan", provinsi: "DKI Jakarta", kecamatan: "Tebet", alamat: "Jl. Taman Bukit Duri No. 2" },
  { npsn: "20107325", nama: "SMAN 68 JAKARTA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Jakarta Pusat", provinsi: "DKI Jakarta", kecamatan: "Senen", alamat: "Jl. Salemba Raya No. 18" },
  { npsn: "20107315", nama: "SMAN 70 JAKARTA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Jakarta Selatan", provinsi: "DKI Jakarta", kecamatan: "Kebayoran Baru", alamat: "Jl. Bulungan Blok C No. 1" },
  { npsn: "20107310", nama: "SMAN 28 JAKARTA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Jakarta Selatan", provinsi: "DKI Jakarta", kecamatan: "Pasar Minggu", alamat: "Jl. Ragunan No. 1" },
  { npsn: "20100171", nama: "SMKN 26 JAKARTA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Jakarta Timur", provinsi: "DKI Jakarta", kecamatan: "Pulo Gadung", alamat: "Jl. Balai Pustaka Baru No. 1" },
  { npsn: "20100172", nama: "SMKN 57 JAKARTA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Jakarta Selatan", provinsi: "DKI Jakarta", kecamatan: "Pasar Minggu", alamat: "Jl. Taman Margasatwa No. 38" },
  { npsn: "20177981", nama: "MAN 4 JAKARTA", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Jakarta Selatan", provinsi: "DKI Jakarta", kecamatan: "Kebayoran Lama", alamat: "Jl. Ciputat Raya No. 4" },
  { npsn: "20177982", nama: "MAN 7 JAKARTA", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Jakarta Selatan", provinsi: "DKI Jakarta", kecamatan: "Jagakarsa", alamat: "Jl. Pengadegan Timur I No. 1" },

  // 12. JAWA BARAT
  { npsn: "20219262", nama: "SMAN 3 BANDUNG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Bandung", provinsi: "Jawa Barat", kecamatan: "Sumur Bandung", alamat: "Jl. Belitung No. 8" },
  { npsn: "20219264", nama: "SMAN 5 BANDUNG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Bandung", provinsi: "Jawa Barat", kecamatan: "Sumur Bandung", alamat: "Jl. Belitung No. 10" },
  { npsn: "20219140", nama: "SMKN 1 BANDUNG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Bandung", provinsi: "Jawa Barat", kecamatan: "Coblong", alamat: "Jl. Wastukancana No. 3" },
  { npsn: "20219141", nama: "SMKN 4 BANDUNG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Bandung", provinsi: "Jawa Barat", kecamatan: "Batununggal", alamat: "Jl. Kliningan No. 6" },
  { npsn: "20277810", nama: "MAN 1 KOTA BANDUNG", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Bandung", provinsi: "Jawa Barat", kecamatan: "Cibeunying Kidul", alamat: "Jl. Sukaluyu No. 1" },
  { npsn: "20277811", nama: "MAN 2 KOTA BANDUNG", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Bandung", provinsi: "Jawa Barat", kecamatan: "Cibiru", alamat: "Jl. Cipadung No. 57" },
  { npsn: "20220310", nama: "SMAN 1 BOGOR", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Bogor", provinsi: "Jawa Barat", kecamatan: "Bogor Tengah", alamat: "Jl. Ir. H. Juanda No. 16" },
  { npsn: "20220330", nama: "SMKN 1 BOGOR", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Bogor", provinsi: "Jawa Barat", kecamatan: "Bogor Tengah", alamat: "Jl. Heulang No. 6" },
  { npsn: "20222950", nama: "SMAN 1 BEKASI", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Bekasi", provinsi: "Jawa Barat", kecamatan: "Bekasi Timur", alamat: "Jl. KH. Agus Salim No. 181" },
  { npsn: "20222970", nama: "SMKN 1 BEKASI", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Bekasi", provinsi: "Jawa Barat", kecamatan: "Bekasi Barat", alamat: "Jl. Bintara VIII No. 2" },
  { npsn: "20229010", nama: "SMAN 1 DEPOK", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Depok", provinsi: "Jawa Barat", kecamatan: "Pancoran Mas", alamat: "Jl. Nusantara Raya No. 317" },
  { npsn: "20229030", nama: "SMKN 1 DEPOK", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Depok", provinsi: "Jawa Barat", kecamatan: "Tapos", alamat: "Jl. Banjaran Pucung No. 1" },

  // 13. BANTEN
  { npsn: "20605072", nama: "SMAN 1 KOTA SERANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Serang", provinsi: "Banten", kecamatan: "Serang", alamat: "Jl. Ahmad Yani No. 39" },
  { npsn: "20605090", nama: "SMKN 1 KOTA SERANG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Serang", provinsi: "Banten", kecamatan: "Cipocok Jaya", alamat: "Jl. KH. Abdul Fatah Hasan No. 88" },
  { npsn: "20614101", nama: "MAN 1 KOTA SERANG", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Serang", provinsi: "Banten", kecamatan: "Serang", alamat: "Jl. KH. Syam'un No. 2" },
  { npsn: "20614102", nama: "MAN 2 KOTA SERANG", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Serang", provinsi: "Banten", kecamatan: "Cipocok Jaya", alamat: "Jl. KH. Abdul Fatah Hasan No. 90" },
  { npsn: "20606827", nama: "SMAN 1 TANGERANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Tangerang", provinsi: "Banten", kecamatan: "Tangerang", alamat: "Jl. Raden Fatah No. 1" },
  { npsn: "20606850", nama: "SMKN 1 TANGERANG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Tangerang", provinsi: "Banten", kecamatan: "Tangerang", alamat: "Jl. Perintis Kemerdekaan II" },
  { npsn: "20623292", nama: "MAN INSAN CENDEKIA SERPONG", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Tangerang Selatan", provinsi: "Banten", kecamatan: "Serpong", alamat: "Jl. Cendekia No. 1, BSD City" },
  { npsn: "20607810", nama: "SMAN 1 KOTA CILEGON", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Cilegon", provinsi: "Banten", kecamatan: "Cibeber", alamat: "Jl. KH. Tubagus Ismail No. 1" },
  { npsn: "20607830", nama: "SMKN 1 KOTA CILEGON", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Cilegon", provinsi: "Banten", kecamatan: "Cibeber", alamat: "Jl. Raden Sastradikarta No. 1" },

  // 14. D.I. YOGYAKARTA
  { npsn: "20403161", nama: "SMAN 1 YOGYAKARTA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Yogyakarta", provinsi: "D.I. Yogyakarta", kecamatan: "Gondomanan", alamat: "Jl. HOS Cokroaminoto No. 10" },
  { npsn: "20403173", nama: "SMAN 3 YOGYAKARTA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Yogyakarta", provinsi: "D.I. Yogyakarta", kecamatan: "Danurejan", alamat: "Jl. Yos Sudarso No. 7, Kotabaru" },
  { npsn: "20403178", nama: "SMAN 8 YOGYAKARTA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Yogyakarta", provinsi: "D.I. Yogyakarta", kecamatan: "Umbulharjo", alamat: "Jl. Sidobali No. 1, Muja Muju" },
  { npsn: "20403289", nama: "SMKN 2 YOGYAKARTA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Yogyakarta", provinsi: "D.I. Yogyakarta", kecamatan: "Jetis", alamat: "Jl. AM Sangaji No. 47" },
  { npsn: "20403290", nama: "SMKN 3 YOGYAKARTA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Yogyakarta", provinsi: "D.I. Yogyakarta", kecamatan: "Jetis", alamat: "Jl. RW Monginsidi No. 2" },
  { npsn: "20409890", nama: "MAN 1 YOGYAKARTA", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Yogyakarta", provinsi: "D.I. Yogyakarta", kecamatan: "Gondomanan", alamat: "Jl. C. Simanjuntak No. 60" },
  { npsn: "20409891", nama: "MAN 2 YOGYAKARTA", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Yogyakarta", provinsi: "D.I. Yogyakarta", kecamatan: "Gondomanan", alamat: "Jl. KH. Ahmad Dahlan No. 130" },
  { npsn: "20401120", nama: "SMAN 1 SLEMAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Sleman", provinsi: "D.I. Yogyakarta", kecamatan: "Sleman", alamat: "Jl. Cempaka No. 1" },
  { npsn: "20401150", nama: "SMKN 1 DEPOK SLEMAN", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Sleman", provinsi: "D.I. Yogyakarta", kecamatan: "Depok", alamat: "Jl. Ring Road Utara, Maguwoharjo" },

  // 15. BALI
  { npsn: "50103178", nama: "SMAN 1 DENPASAR", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Denpasar", provinsi: "Bali", kecamatan: "Denpasar Barat", alamat: "Jl. Kamboja No. 4" },
  { npsn: "50103180", nama: "SMAN 3 DENPASAR", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Denpasar", provinsi: "Bali", kecamatan: "Denpasar Timur", alamat: "Jl. Nusa Indah No. 20" },
  { npsn: "50103181", nama: "SMAN 4 DENPASAR", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Denpasar", provinsi: "Bali", kecamatan: "Denpasar Barat", alamat: "Jl. Gunung Rinjani No. 1" },
  { npsn: "50103195", nama: "SMKN 1 DENPASAR", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Denpasar", provinsi: "Bali", kecamatan: "Denpasar Barat", alamat: "Jl. HOS Cokroaminoto No. 84" },
  { npsn: "50103196", nama: "SMKN 2 DENPASAR", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Denpasar", provinsi: "Bali", kecamatan: "Denpasar Selatan", alamat: "Jl. Pendidikan No. 28, Sidakarya" },
  { npsn: "50105410", nama: "MAN 1 DENPASAR", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Denpasar", provinsi: "Bali", kecamatan: "Denpasar Barat", alamat: "Jl. Ahmad Yani No. 88" },
  { npsn: "50101510", nama: "SMAN 1 SINGARAJA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Buleleng", provinsi: "Bali", kecamatan: "Buleleng", alamat: "Jl. Pramuka No. 4" },
  { npsn: "50101530", nama: "SMKN 1 SINGARAJA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Buleleng", provinsi: "Bali", kecamatan: "Buleleng", alamat: "Jl. Ngurah Rai No. 10" },

  // 16. NUSA TENGGARA BARAT (NTB)
  { npsn: "50201389", nama: "SMAN 1 MATARAM", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Mataram", provinsi: "Nusa Tenggara Barat", kecamatan: "Mataram", alamat: "Jl. Pendidikan No. 21" },
  { npsn: "50201390", nama: "SMAN 2 MATARAM", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Mataram", provinsi: "Nusa Tenggara Barat", kecamatan: "Mataram", alamat: "Jl. Majapahit No. 10" },
  { npsn: "50201402", nama: "SMKN 1 MATARAM", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Mataram", provinsi: "Nusa Tenggara Barat", kecamatan: "Selaparang", alamat: "Jl. Langko No. 42" },
  { npsn: "50201403", nama: "SMKN 2 MATARAM", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Mataram", provinsi: "Nusa Tenggara Barat", kecamatan: "Mataram", alamat: "Jl. Pemuda No. 5" },
  { npsn: "50221410", nama: "MAN 1 MATARAM", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Mataram", provinsi: "Nusa Tenggara Barat", kecamatan: "Mataram", alamat: "Jl. Pendidikan No. 2" },
  { npsn: "50221411", nama: "MAN 2 MATARAM", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Mataram", provinsi: "Nusa Tenggara Barat", kecamatan: "Selaparang", alamat: "Jl. Transmigrasi No. 18" },
  { npsn: "50202110", nama: "SMAN 1 SUMBAWA BESAR", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Sumbawa", provinsi: "Nusa Tenggara Barat", kecamatan: "Sumbawa", alamat: "Jl. Garuda No. 3" },
  { npsn: "50202130", nama: "SMKN 1 SUMBAWA BESAR", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Sumbawa", provinsi: "Nusa Tenggara Barat", kecamatan: "Sumbawa", alamat: "Jl. Hasanuddin No. 1" },

  // 17. NUSA TENGGARA TIMUR (NTT)
  { npsn: "50305018", nama: "SMAN 1 KUPANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Kupang", provinsi: "Nusa Tenggara Timur", kecamatan: "Oebobo", alamat: "Jl. Cak Doko No. 76" },
  { npsn: "50305019", nama: "SMAN 3 KUPANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Kupang", provinsi: "Nusa Tenggara Timur", kecamatan: "Kota Raja", alamat: "Jl. W.J. Lalamentik No. 1" },
  { npsn: "50305035", nama: "SMKN 1 KUPANG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Kupang", provinsi: "Nusa Tenggara Timur", kecamatan: "Kelapa Lima", alamat: "Jl. Prof. Dr. W.Z. Johannes No. 1" },
  { npsn: "50305036", nama: "SMKN 2 KUPANG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Kupang", provinsi: "Nusa Tenggara Timur", kecamatan: "Oebobo", alamat: "Jl. Perintis Kemerdekaan" },
  { npsn: "50309810", nama: "MAN KUPANG", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Kupang", provinsi: "Nusa Tenggara Timur", kecamatan: "Alak", alamat: "Jl. Airlobang No. 2" },
  { npsn: "50301210", nama: "SMAN 1 ENDE", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Ende", provinsi: "Nusa Tenggara Timur", kecamatan: "Ende Tengah", alamat: "Jl. El Tari No. 12" },
  { npsn: "50301230", nama: "SMKN 1 ENDE", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Ende", provinsi: "Nusa Tenggara Timur", kecamatan: "Ende Utara", alamat: "Jl. Gatot Subroto No. 5" },

  // 18. KALIMANTAN BARAT
  { npsn: "30105210", nama: "SMAN 1 PONTIANAK", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Pontianak", provinsi: "Kalimantan Barat", kecamatan: "Pontianak Selatan", alamat: "Jl. Sultan Syarif Abdurrahman No. 82" },
  { npsn: "30105212", nama: "SMAN 3 PONTIANAK", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Pontianak", provinsi: "Kalimantan Barat", kecamatan: "Pontianak Selatan", alamat: "Jl. WR Supratman No. 1" },
  { npsn: "30105234", nama: "SMKN 1 PONTIANAK", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Pontianak", provinsi: "Kalimantan Barat", kecamatan: "Pontianak Kota", alamat: "Jl. Danau Sentarum No. 10" },
  { npsn: "30105235", nama: "SMKN 3 PONTIANAK", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Pontianak", provinsi: "Kalimantan Barat", kecamatan: "Pontianak Barat", alamat: "Jl. S. Parman No. 2" },
  { npsn: "30108910", nama: "MAN 1 PONTIANAK", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Pontianak", provinsi: "Kalimantan Barat", kecamatan: "Pontianak Selatan", alamat: "Jl. Daeng Abdul Hadi No. 1" },
  { npsn: "30108911", nama: "MAN 2 PONTIANAK", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Pontianak", provinsi: "Kalimantan Barat", kecamatan: "Pontianak Selatan", alamat: "Jl. Jenderal Ahmad Yani No. 12" },
  { npsn: "30104110", nama: "SMAN 1 SINGKAWANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Singkawang", provinsi: "Kalimantan Barat", kecamatan: "Singkawang Barat", alamat: "Jl. Merdeka No. 1" },
  { npsn: "30104130", nama: "SMKN 1 SINGKAWANG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Singkawang", provinsi: "Kalimantan Barat", kecamatan: "Singkawang Barat", alamat: "Jl. Karya No. 20" },

  // 19. KALIMANTAN TENGAH
  { npsn: "30203490", nama: "SMAN 1 PALANGKA RAYA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Palangka Raya", provinsi: "Kalimantan Tengah", kecamatan: "Jekan Raya", alamat: "Jl. AIS Nasution No. 2" },
  { npsn: "30203491", nama: "SMAN 2 PALANGKA RAYA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Palangka Raya", provinsi: "Kalimantan Tengah", kecamatan: "Jekan Raya", alamat: "Jl. MH Thamrin No. 1" },
  { npsn: "30203512", nama: "SMKN 1 PALANGKA RAYA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Palangka Raya", provinsi: "Kalimantan Tengah", kecamatan: "Pahandut", alamat: "Jl. Tambun Bungai No. 10" },
  { npsn: "30203513", nama: "SMKN 2 PALANGKA RAYA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Palangka Raya", provinsi: "Kalimantan Tengah", kecamatan: "Jekan Raya", alamat: "Jl. Letjend S. Parman" },
  { npsn: "30206101", nama: "MAN KOTA PALANGKA RAYA", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Palangka Raya", provinsi: "Kalimantan Tengah", kecamatan: "Pahandut", alamat: "Jl. Tjilik Riwut Km. 4" },
  { npsn: "30201210", nama: "SMAN 1 SAMPIT", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Kotawaringin Timur", provinsi: "Kalimantan Tengah", kecamatan: "Mentawa Baru Ketapang", alamat: "Jl. Jenderal Sudirman Km. 1" },
  { npsn: "30201230", nama: "SMKN 1 SAMPIT", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Kotawaringin Timur", provinsi: "Kalimantan Tengah", kecamatan: "Baamang", alamat: "Jl. Pemuda No. 4" },

  // 20. KALIMANTAN SELATAN
  { npsn: "30304250", nama: "SMAN 1 BANJARMASIN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Banjarmasin", provinsi: "Kalimantan Selatan", kecamatan: "Banjarmasin Tengah", alamat: "Jl. Mulawarman No. 25" },
  { npsn: "30304251", nama: "SMAN 2 BANJARMASIN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Banjarmasin", provinsi: "Kalimantan Selatan", kecamatan: "Banjarmasin Tengah", alamat: "Jl. Mulawarman No. 21" },
  { npsn: "30304278", nama: "SMKN 1 BANJARMASIN", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Banjarmasin", provinsi: "Kalimantan Selatan", kecamatan: "Banjarmasin Tengah", alamat: "Jl. Mulawarman No. 1" },
  { npsn: "30304279", nama: "SMKN 2 BANJARMASIN", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Banjarmasin", provinsi: "Kalimantan Selatan", kecamatan: "Banjarmasin Barat", alamat: "Jl. Brigjen H. Hasan Basri No. 6" },
  { npsn: "30314101", nama: "MAN 1 BANJARMASIN", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Banjarmasin", provinsi: "Kalimantan Selatan", kecamatan: "Banjarmasin Timur", alamat: "Jl. Kampung Melayu Darat No. 1" },
  { npsn: "30314102", nama: "MAN 2 BANJARMASIN", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Banjarmasin", provinsi: "Kalimantan Selatan", kecamatan: "Banjarmasin Tengah", alamat: "Jl. Pramuka No. 3" },
  { npsn: "30304810", nama: "SMAN 1 BANJARBARU", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Banjarbaru", provinsi: "Kalimantan Selatan", kecamatan: "Banjarbaru Utara", alamat: "Jl. P. Batur Barat No. 1" },
  { npsn: "30304830", nama: "SMKN 1 BANJARBARU", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Banjarbaru", provinsi: "Kalimantan Selatan", kecamatan: "Banjarbaru Selatan", alamat: "Jl. Karang Anyar No. 2" },

  // 21. KALIMANTAN TIMUR
  { npsn: "30401062", nama: "SMAN 1 SAMARINDA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Samarinda", provinsi: "Kalimantan Timur", kecamatan: "Samarinda Ulu", alamat: "Jl. Bhayangkara No. 1" },
  { npsn: "30401064", nama: "SMAN 3 SAMARINDA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Samarinda", provinsi: "Kalimantan Timur", kecamatan: "Samarinda Ulu", alamat: "Jl. Juanda No. 20" },
  { npsn: "30401089", nama: "SMKN 1 SAMARINDA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Samarinda", provinsi: "Kalimantan Timur", kecamatan: "Samarinda Ilir", alamat: "Jl. Pahlawan No. 4" },
  { npsn: "30401090", nama: "SMKN 2 SAMARINDA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Samarinda", provinsi: "Kalimantan Timur", kecamatan: "Samarinda Ulu", alamat: "Jl. Pemuda No. 12" },
  { npsn: "30409810", nama: "MAN 1 SAMARINDA", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Samarinda", provinsi: "Kalimantan Timur", kecamatan: "Samarinda Ulu", alamat: "Jl. P. Suryanata No. 5" },
  { npsn: "30409811", nama: "MAN 2 SAMARINDA", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Samarinda", provinsi: "Kalimantan Timur", kecamatan: "Samarinda Seberang", alamat: "Jl. Bung Tomo No. 1" },
  { npsn: "30401490", nama: "SMAN 1 BALIKPAPAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Balikpapan", provinsi: "Kalimantan Timur", kecamatan: "Balikpapan Kota", alamat: "Jl. Kapten Piere Tendean No. 63" },
  { npsn: "30401510", nama: "SMKN 1 BALIKPAPAN", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Balikpapan", provinsi: "Kalimantan Timur", kecamatan: "Balikpapan Selatan", alamat: "Jl. Marsma R. Iswahyudi No. 1" },

  // 22. KALIMANTAN UTARA
  { npsn: "30402610", nama: "SMAN 1 TANJUNG SELOR", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Bulungan", provinsi: "Kalimantan Utara", kecamatan: "Tanjung Selor", alamat: "Jl. Kolonel Soetadji No. 1" },
  { npsn: "30402630", nama: "SMKN 1 TANJUNG SELOR", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Bulungan", provinsi: "Kalimantan Utara", kecamatan: "Tanjung Selor", alamat: "Jl. Jenderal Sudirman No. 15" },
  { npsn: "30407101", nama: "MAN TANJUNG SELOR", bentuk: "MA", status: "Negeri", kabupatenKota: "Kab. Bulungan", provinsi: "Kalimantan Utara", kecamatan: "Tanjung Selor", alamat: "Jl. Agathis No. 2" },
  { npsn: "30402801", nama: "SMAN 1 TARAKAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Tarakan", provinsi: "Kalimantan Utara", kecamatan: "Tarakan Barat", alamat: "Jl. Ki Hajar Dewantara No. 1" },
  { npsn: "30402820", nama: "SMKN 1 TARAKAN", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Tarakan", provinsi: "Kalimantan Utara", kecamatan: "Tarakan Tengah", alamat: "Jl. P. Diponegoro No. 8" },
  { npsn: "30407120", nama: "MAN TARAKAN", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Tarakan", provinsi: "Kalimantan Utara", kecamatan: "Tarakan Barat", alamat: "Jl. Mulawarman No. 25" },
  { npsn: "30403110", nama: "SMAN 1 NUNUKAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Nunukan", provinsi: "Kalimantan Utara", kecamatan: "Nunukan", alamat: "Jl. Ujang Dewa No. 1" },
  { npsn: "30403130", nama: "SMKN 1 NUNUKAN", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Nunukan", provinsi: "Kalimantan Utara", kecamatan: "Nunukan", alamat: "Jl. P. Antasari No. 10" },

  // 23. SULAWESI UTARA
  { npsn: "40102602", nama: "SMAN 1 MANADO", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Manado", provinsi: "Sulawesi Utara", kecamatan: "Sario", alamat: "Jl. Sam Ratulangi No. 128" },
  { npsn: "40102604", nama: "SMAN 9 MANADO", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Manado", provinsi: "Sulawesi Utara", kecamatan: "Malalayang", alamat: "Jl. Wolter Monginsidi No. 10" },
  { npsn: "40102628", nama: "SMKN 1 MANADO", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Manado", provinsi: "Sulawesi Utara", kecamatan: "Wenang", alamat: "Jl. Pramuka No. 1" },
  { npsn: "40102629", nama: "SMKN 2 MANADO", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Manado", provinsi: "Sulawesi Utara", kecamatan: "Sario", alamat: "Jl. Stadion Klabat No. 5" },
  { npsn: "40109101", nama: "MAN 1 MANADO", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Manado", provinsi: "Sulawesi Utara", kecamatan: "Tuminting", alamat: "Jl. Hasanuddin No. 3" },
  { npsn: "40103110", nama: "SMAN 1 TOMOHON", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Tomohon", provinsi: "Sulawesi Utara", kecamatan: "Tomohon Tengah", alamat: "Jl. Siswa No. 1" },
  { npsn: "40103130", nama: "SMKN 1 TOMOHON", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Tomohon", provinsi: "Sulawesi Utara", kecamatan: "Tomohon Selatan", alamat: "Jl. Paslaten No. 10" },

  // 24. GORONTALO
  { npsn: "40501065", nama: "SMAN 1 GORONTALO", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Gorontalo", provinsi: "Gorontalo", kecamatan: "Kota Selatan", alamat: "Jl. M.T. Haryono No. 1" },
  { npsn: "40501067", nama: "SMAN 3 GORONTALO", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Gorontalo", provinsi: "Gorontalo", kecamatan: "Kota Tengah", alamat: "Jl. Pangeran Hidayat No. 20" },
  { npsn: "40501089", nama: "SMKN 1 GORONTALO", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Gorontalo", provinsi: "Gorontalo", kecamatan: "Kota Barat", alamat: "Jl. Tinaloga No. 4" },
  { npsn: "40502101", nama: "MAN 1 GORONTALO", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Gorontalo", provinsi: "Gorontalo", kecamatan: "Dumbo Raya", alamat: "Jl. Rusli Datau No. 10" },
  { npsn: "40501438", nama: "MAN INSAN CENDEKIA GORONTALO", bentuk: "MA", status: "Negeri", kabupatenKota: "Kab. Bone Bolango", provinsi: "Gorontalo", kecamatan: "Suwawa", alamat: "Jl. Kasmat Lahay No. 1" },
  { npsn: "40501210", nama: "SMAN 1 LIMBOTO", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Gorontalo", provinsi: "Gorontalo", kecamatan: "Limboto", alamat: "Jl. Jenderal Sudirman No. 40" },
  { npsn: "40501230", nama: "SMKN 1 LIMBOTO", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Gorontalo", provinsi: "Gorontalo", kecamatan: "Limboto", alamat: "Jl. Trans Sulawesi No. 15" },

  // 25. SULAWESI TENGAH
  { npsn: "40203480", nama: "SMAN 1 PALU", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Palu", provinsi: "Sulawesi Tengah", kecamatan: "Palu Barat", alamat: "Jl. Gatot Subroto No. 70" },
  { npsn: "40203481", nama: "SMAN 2 PALU", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Palu", provinsi: "Sulawesi Tengah", kecamatan: "Palu Timur", alamat: "Jl. Tanjung Dako No. 9" },
  { npsn: "40203505", nama: "SMKN 1 PALU", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Palu", provinsi: "Sulawesi Tengah", kecamatan: "Palu Barat", alamat: "Jl. R.A. Kartini No. 1" },
  { npsn: "40203506", nama: "SMKN 2 PALU", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Palu", provinsi: "Sulawesi Tengah", kecamatan: "Palu Selatan", alamat: "Jl. Setia Budi No. 12" },
  { npsn: "40207101", nama: "MAN 1 PALU", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Palu", provinsi: "Sulawesi Tengah", kecamatan: "Palu Barat", alamat: "Jl. Hang Tuah No. 10" },
  { npsn: "40207102", nama: "MAN 2 PALU", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Palu", provinsi: "Sulawesi Tengah", kecamatan: "Palu Selatan", alamat: "Jl. M.T. Haryono No. 5" },
  { npsn: "40201210", nama: "SMAN 1 LUWUK", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Banggai", provinsi: "Sulawesi Tengah", kecamatan: "Luwuk", alamat: "Jl. Urip Sumoharjo No. 1" },
  { npsn: "40201230", nama: "SMKN 1 LUWUK", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Banggai", provinsi: "Sulawesi Tengah", kecamatan: "Luwuk", alamat: "Jl. Ahmad Yani No. 10" },

  // 26. SULAWESI BARAT
  { npsn: "40600850", nama: "SMAN 1 MAMUJU", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Mamuju", provinsi: "Sulawesi Barat", kecamatan: "Mamuju", alamat: "Jl. Kumbang Malam No. 1" },
  { npsn: "40600851", nama: "SMAN 2 MAMUJU", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Mamuju", provinsi: "Sulawesi Barat", kecamatan: "Simboro", alamat: "Jl. Martadinata No. 5" },
  { npsn: "40600872", nama: "SMKN 1 MAMUJU", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Mamuju", provinsi: "Sulawesi Barat", kecamatan: "Mamuju", alamat: "Jl. Pattimura No. 12" },
  { npsn: "40602101", nama: "MAN 1 MAMUJU", bentuk: "MA", status: "Negeri", kabupatenKota: "Kab. Mamuju", provinsi: "Sulawesi Barat", kecamatan: "Mamuju", alamat: "Jl. K.H. Daeng Sikki No. 1" },
  { npsn: "40601210", nama: "SMAN 1 MAJENE", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Majene", provinsi: "Sulawesi Barat", kecamatan: "Banggae", alamat: "Jl. Jenderal Sudirman No. 1" },
  { npsn: "40601230", nama: "SMKN 1 MAJENE", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Majene", provinsi: "Sulawesi Barat", kecamatan: "Banggae", alamat: "Jl. Wolter Monginsidi No. 14" },
  { npsn: "40601410", nama: "SMAN 1 POLEWALI", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Polewali Mandar", provinsi: "Sulawesi Barat", kecamatan: "Polewali", alamat: "Jl. H.O.S. Cokroaminoto No. 1" },
  { npsn: "40601430", nama: "SMKN 1 POLEWALI", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Polewali Mandar", provinsi: "Sulawesi Barat", kecamatan: "Polewali", alamat: "Jl. Stadion No. 2" },

  // 27. SULAWESI SELATAN
  { npsn: "40311950", nama: "SMAN 1 MAKASSAR", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Makassar", provinsi: "Sulawesi Selatan", kecamatan: "Ujung Pandang", alamat: "Jl. Gunung Bawakaraeng No. 53" },
  { npsn: "40311951", nama: "SMAN 2 MAKASSAR", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Makassar", provinsi: "Sulawesi Selatan", kecamatan: "Mamajang", alamat: "Jl. Baji Gau No. 17" },
  { npsn: "40311954", nama: "SMAN 5 MAKASSAR", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Makassar", provinsi: "Sulawesi Selatan", kecamatan: "Tallo", alamat: "Jl. Taman Makam Pahlawan No. 4" },
  { npsn: "40311978", nama: "SMKN 1 MAKASSAR", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Makassar", provinsi: "Sulawesi Selatan", kecamatan: "Rappocini", alamat: "Jl. A.P. Pettarani No. 1" },
  { npsn: "40311979", nama: "SMKN 2 MAKASSAR", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Makassar", provinsi: "Sulawesi Selatan", kecamatan: "Tamalate", alamat: "Jl. Pancasila No. 1" },
  { npsn: "40318910", nama: "MAN 1 MAKASSAR", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Makassar", provinsi: "Sulawesi Selatan", kecamatan: "Rappocini", alamat: "Jl. Talasalapang No. 46" },
  { npsn: "40318911", nama: "MAN 2 MODEL MAKASSAR", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Makassar", provinsi: "Sulawesi Selatan", kecamatan: "Panakkukang", alamat: "Jl. Perintis Kemerdekaan Km. 12" },
  { npsn: "40307110", nama: "SMAN 1 GOWA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Gowa", provinsi: "Sulawesi Selatan", kecamatan: "Somba Opu", alamat: "Jl. K.H. Wahid Hasyim No. 8" },
  { npsn: "40307130", nama: "SMKN 1 GOWA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Gowa", provinsi: "Sulawesi Selatan", kecamatan: "Somba Opu", alamat: "Jl. Mesjid Raya No. 4" },
  { npsn: "40308110", nama: "SMAN 1 PAREPARE", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Parepare", provinsi: "Sulawesi Selatan", kecamatan: "Soreang", alamat: "Jl. Pemuda No. 1" },
  { npsn: "40308130", nama: "SMKN 1 PAREPARE", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Parepare", provinsi: "Sulawesi Selatan", kecamatan: "Ujung", alamat: "Jl. Bau Massepe No. 100" },

  // 28. SULAWESI TENGGARA
  { npsn: "40402630", nama: "SMAN 1 KENDARI", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Kendari", provinsi: "Sulawesi Tenggara", kecamatan: "Mandonga", alamat: "Jl. Mayjen S. Parman No. 2" },
  { npsn: "40402633", nama: "SMAN 4 KENDARI", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Kendari", provinsi: "Sulawesi Tenggara", kecamatan: "Kadia", alamat: "Jl. Ahmad Yani No. 13" },
  { npsn: "40402655", nama: "SMKN 1 KENDARI", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Kendari", provinsi: "Sulawesi Tenggara", kecamatan: "Kadia", alamat: "Jl. Budi Utomo No. 1" },
  { npsn: "40402656", nama: "SMKN 2 KENDARI", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Kendari", provinsi: "Sulawesi Tenggara", kecamatan: "Mandonga", alamat: "Jl. Jenderal Ahmad Yani" },
  { npsn: "40408101", nama: "MAN 1 KENDARI", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Kendari", provinsi: "Sulawesi Tenggara", kecamatan: "Baruga", alamat: "Jl. DI Panjaitan No. 1" },
  { npsn: "40403110", nama: "SMAN 1 BAU-BAU", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Bau-Bau", provinsi: "Sulawesi Tenggara", kecamatan: "Wolio", alamat: "Jl. Pahlawan No. 1" },
  { npsn: "40403130", nama: "SMKN 1 BAU-BAU", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Bau-Bau", provinsi: "Sulawesi Tenggara", kecamatan: "Betoambari", alamat: "Jl. Yos Sudarso No. 12" },

  // 29. MALUKU
  { npsn: "60101980", nama: "SMAN 1 AMBON", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Ambon", provinsi: "Maluku", kecamatan: "Sirimau", alamat: "Jl. Philip Latumahina No. 1" },
  { npsn: "60101981", nama: "SMAN 2 AMBON", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Ambon", provinsi: "Maluku", kecamatan: "Sirimau", alamat: "Jl. Karang Panjang No. 1" },
  { npsn: "60102005", nama: "SMKN 1 AMBON", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Ambon", provinsi: "Maluku", kecamatan: "Nusaniwe", alamat: "Jl. Dr. Kayadoe No. 1" },
  { npsn: "60102006", nama: "SMKN 2 AMBON", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Ambon", provinsi: "Maluku", kecamatan: "Sirimau", alamat: "Jl. Rijali No. 10" },
  { npsn: "60105101", nama: "MAN 1 AMBON", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Ambon", provinsi: "Maluku", kecamatan: "Sirimau", alamat: "Jl. Kebun Cengkeh No. 1" },
  { npsn: "60102110", nama: "SMAN 1 TUAL", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Tual", provinsi: "Maluku", kecamatan: "Dullah Selatan", alamat: "Jl. Soekarno-Hatta No. 2" },
  { npsn: "60102130", nama: "SMKN 1 TUAL", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Tual", provinsi: "Maluku", kecamatan: "Dullah Selatan", alamat: "Jl. Pattimura No. 1" },

  // 30. MALUKU UTARA
  { npsn: "60201050", nama: "SMAN 1 TERNATE", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Ternate", provinsi: "Maluku Utara", kecamatan: "Ternate Tengah", alamat: "Jl. Ki Hajar Dewantara No. 1" },
  { npsn: "60201057", nama: "SMAN 8 TERNATE", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Ternate", provinsi: "Maluku Utara", kecamatan: "Ternate Selatan", alamat: "Jl. Siswa No. 10" },
  { npsn: "60201072", nama: "SMKN 1 TERNATE", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Ternate", provinsi: "Maluku Utara", kecamatan: "Ternate Tengah", alamat: "Jl. Batu Angus No. 5" },
  { npsn: "60202101", nama: "MAN 1 TERNATE", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Ternate", provinsi: "Maluku Utara", kecamatan: "Ternate Selatan", alamat: "Jl. Fitu No. 2" },
  { npsn: "60201210", nama: "SMAN 1 TIDORE KEPULAUAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Tidore Kepulauan", provinsi: "Maluku Utara", kecamatan: "Tidore", alamat: "Jl. Sultan Nuku No. 1" },
  { npsn: "60201230", nama: "SMKN 1 TIDORE KEPULAUAN", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Tidore Kepulauan", provinsi: "Maluku Utara", kecamatan: "Tidore", alamat: "Jl. Kemakmuran No. 4" },

  // 31. PAPUA
  { npsn: "60301052", nama: "SMAN 1 JAYAPURA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Jayapura", provinsi: "Papua", kecamatan: "Jayapura Utara", alamat: "Jl. Sam Ratulangi No. 1" },
  { npsn: "60301053", nama: "SMAN 2 JAYAPURA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Jayapura", provinsi: "Papua", kecamatan: "Jayapura Selatan", alamat: "Jl. Raya Entrop No. 2" },
  { npsn: "60301055", nama: "SMAN 4 JAYAPURA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Jayapura", provinsi: "Papua", kecamatan: "Abepura", alamat: "Jl. Raya Abepura-Kotaraja" },
  { npsn: "60301075", nama: "SMKN 1 JAYAPURA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Jayapura", provinsi: "Papua", kecamatan: "Jayapura Selatan", alamat: "Jl. Raya Entrop No. 10" },
  { npsn: "60301076", nama: "SMKN 2 JAYAPURA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Jayapura", provinsi: "Papua", kecamatan: "Abepura", alamat: "Jl. Kotaraja No. 5" },
  { npsn: "60305101", nama: "MAN JAYAPURA", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Jayapura", provinsi: "Papua", kecamatan: "Abepura", alamat: "Jl. Raya Sentani Km. 9" },
  { npsn: "60301210", nama: "SMAN 1 SENTANI", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Jayapura", provinsi: "Papua", kecamatan: "Sentani", alamat: "Jl. Raya Sentani-Depapre" },
  { npsn: "60301230", nama: "SMKN 1 SENTANI", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Jayapura", provinsi: "Papua", kecamatan: "Sentani", alamat: "Jl. Kemiri No. 15" },

  // 32. PAPUA BARAT
  { npsn: "60401032", nama: "SMAN 1 MANOKWARI", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Manokwari", provinsi: "Papua Barat", kecamatan: "Manokwari Barat", alamat: "Jl. Merdeka No. 1" },
  { npsn: "60401033", nama: "SMAN 2 MANOKWARI", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Manokwari", provinsi: "Papua Barat", kecamatan: "Manokwari Timur", alamat: "Jl. Percetakan Negara No. 10" },
  { npsn: "60401055", nama: "SMKN 1 MANOKWARI", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Manokwari", provinsi: "Papua Barat", kecamatan: "Manokwari Barat", alamat: "Jl. Brawijaya No. 15" },
  { npsn: "60405101", nama: "MAN MANOKWARI", bentuk: "MA", status: "Negeri", kabupatenKota: "Kab. Manokwari", provinsi: "Papua Barat", kecamatan: "Manokwari Barat", alamat: "Jl. Dr. Sam Ratulangi No. 4" },
  { npsn: "60401210", nama: "SMAN 1 FAKFAK", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Fakfak", provinsi: "Papua Barat", kecamatan: "Fakfak", alamat: "Jl. Ahmad Yani No. 1" },
  { npsn: "60401230", nama: "SMKN 1 FAKFAK", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Fakfak", provinsi: "Papua Barat", kecamatan: "Fakfak", alamat: "Jl. Cenderawasih No. 10" },

  // 33. PAPUA TENGAH
  { npsn: "60303030", nama: "SMAN 1 NABIRE", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Nabire", provinsi: "Papua Tengah", kecamatan: "Nabire", alamat: "Jl. Jenderal Sudirman No. 1" },
  { npsn: "60303031", nama: "SMAN 2 NABIRE", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Nabire", provinsi: "Papua Tengah", kecamatan: "Nabire", alamat: "Jl. Merdeka No. 25" },
  { npsn: "60303052", nama: "SMKN 1 NABIRE", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Nabire", provinsi: "Papua Tengah", kecamatan: "Nabire", alamat: "Jl. Pemuda No. 4" },
  { npsn: "60307101", nama: "MAN NABIRE", bentuk: "MA", status: "Negeri", kabupatenKota: "Kab. Nabire", provinsi: "Papua Tengah", kecamatan: "Nabire", alamat: "Jl. Mandala No. 8" },
  { npsn: "60303210", nama: "SMAN 1 TIMIKA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Mimika", provinsi: "Papua Tengah", kecamatan: "Mimika Baru", alamat: "Jl. Budi Utomo No. 1" },
  { npsn: "60303230", nama: "SMKN 1 MIMIKA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Mimika", provinsi: "Papua Tengah", kecamatan: "Kuala Kencana", alamat: "Jl. Poros Timika-Kuala Kencana" },

  // 34. PAPUA SELATAN
  { npsn: "60302040", nama: "SMAN 1 MERAUKE", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Merauke", provinsi: "Papua Selatan", kecamatan: "Merauke", alamat: "Jl. Pendidikan No. 1" },
  { npsn: "60302041", nama: "SMAN 2 MERAUKE", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Merauke", provinsi: "Papua Selatan", kecamatan: "Merauke", alamat: "Jl. Brawijaya No. 12" },
  { npsn: "60302065", nama: "SMKN 1 MERAUKE", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Merauke", provinsi: "Papua Selatan", kecamatan: "Merauke", alamat: "Jl. Yos Sudarso No. 40" },
  { npsn: "60308101", nama: "MAN MERAUKE", bentuk: "MA", status: "Negeri", kabupatenKota: "Kab. Merauke", provinsi: "Papua Selatan", kecamatan: "Merauke", alamat: "Jl. Ermasu No. 2" },
  { npsn: "60302210", nama: "SMAN 1 BOVEN DIGOEL", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Boven Digoel", provinsi: "Papua Selatan", kecamatan: "Mandobo", alamat: "Jl. Trans Papua No. 5" },

  // 35. PAPUA PEGUNUNGAN
  { npsn: "60304020", nama: "SMAN 1 WAMENA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Jayawijaya", provinsi: "Papua Pegunungan", kecamatan: "Wamena", alamat: "Jl. Bhayangkara No. 1" },
  { npsn: "60304021", nama: "SMAN 2 WAMENA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Jayawijaya", provinsi: "Papua Pegunungan", kecamatan: "Wamena", alamat: "Jl. Yos Sudarso No. 18" },
  { npsn: "60304045", nama: "SMKN 1 WAMENA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Jayawijaya", provinsi: "Papua Pegunungan", kecamatan: "Wamena", alamat: "Jl. Hom-Hom No. 2" },
  { npsn: "60309101", nama: "MAN WAMENA", bentuk: "MA", status: "Negeri", kabupatenKota: "Kab. Jayawijaya", provinsi: "Papua Pegunungan", kecamatan: "Wamena", alamat: "Jl. Safri Darwin No. 4" },
  { npsn: "60304210", nama: "SMAN 1 TIOM", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Lanny Jaya", provinsi: "Papua Pegunungan", kecamatan: "Tiom", alamat: "Jl. Trans Tiom No. 1" },

  // 36. PAPUA BARAT DAYA
  { npsn: "60402020", nama: "SMAN 1 KOTA SORONG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Sorong", provinsi: "Papua Barat Daya", kecamatan: "Sorong Manoi", alamat: "Jl. Basuki Rahmat Km. 9" },
  { npsn: "60402022", nama: "SMAN 3 KOTA SORONG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Sorong", provinsi: "Papua Barat Daya", kecamatan: "Sorong Barat", alamat: "Jl. Jenderal Sudirman No. 1" },
  { npsn: "60402045", nama: "SMKN 1 KOTA SORONG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Sorong", provinsi: "Papua Barat Daya", kecamatan: "Sorong Manoi", alamat: "Jl. Basuki Rahmat Km. 10" },
  { npsn: "60408101", nama: "MAN KOTA SORONG", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Sorong", provinsi: "Papua Barat Daya", kecamatan: "Sorong Timur", alamat: "Jl. Arfak No. 2" },
  { npsn: "60402210", nama: "SMAN 1 RAJA AMPAT", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Raja Ampat", provinsi: "Papua Barat Daya", kecamatan: "Kota Waisai", alamat: "Jl. Marinda No. 1, Waisai" },
  { npsn: "60402230", nama: "SMKN 1 RAJA AMPAT", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Raja Ampat", provinsi: "Papua Barat Daya", kecamatan: "Kota Waisai", alamat: "Jl. Pari No. 2, Waisai" }
];

fs.writeFileSync('generated_nationwide_schools.json', JSON.stringify(nationwideSchools, null, 2));
console.log(`Generated ${nationwideSchools.length} schools for all nationwide provinces.`);
