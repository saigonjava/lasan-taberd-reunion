const GRADIENTS = [
  'from-sky-500 to-blue-600',
  'from-emerald-500 to-teal-600',
  'from-rose-500 to-red-600',
  'from-purple-500 to-violet-600',
  'from-orange-500 to-amber-600',
  'from-cyan-500 to-sky-600',
  'from-green-500 to-emerald-600',
  'from-fuchsia-500 to-pink-600',
  'from-red-500 to-rose-600',
  'from-indigo-500 to-blue-600',
  'from-teal-500 to-cyan-600',
  'from-slate-500 to-slate-600',
]

function initialsOf(name) {
  const parts = name.trim().split(/\s+/)
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function bioFor(location) {
  return location
    ? `Lasan Taberd Class of 1977 alumnus, now residing in ${location}.`
    : 'Lasan Taberd Class of 1977 alumnus.'
}

// Tuple format: [name, location, country = 'USA', profession = 'Retired', photo = null]
// photo is just the filename (e.g. 'bui-duy-thien.jpg') placed in public/photos/alumni/
const RAW = [
  // B
  ['Bành Đình Tuấn', 'France', 'Paris', 'Dentist'],
  ['Bảo Hùng', 'Houston, TX', 'USA', 'Retired', 'bao-hung.jpg'],
  ['Bùi Duy Thiện', 'San Jose, CA', 'USA', 'Dentist'],
  ['Bùi Đức Tiến', 'Sydney', 'Australia'],
  ['Bùi Hữu Tín', 'Sài Gòn', 'Việt Nam', 'Retired', 'bui-huu-tin.jpg'],
  ['Bùi Văn Dũng', 'Orange County, CA', 'USA', 'Retired', 'bui-van-dung.jpg'],
  ['Bùi Tấn Quốc Bắc', 'Orange County, CA'],
  // C
  // Đ
  ['Đặng Thanh Liêm', 'France', 'Paris', 'Retired', 'dang-thanh-liem.jpg'],
  ['Đặng Tùng Lâm', 'Sài Gòn', 'Việt Nam', 'Retired'],
  ['Đặng Trường Sơn', 'Sài Gòn', 'Việt Nam', 'Retired'],
  ['Đỗ Thanh Sơn', 'Orange County, CA'],
  ['Dương Quốc Vũ', 'Orange County, CA', 'USA', 'DDS', 'duong-quoc-vu.jpg'],
  // H
  ['Hoàng Đức Tường', 'San Jose, CA', 'USA', 'Retired', 'hoang-duc-tuong.jpg'],
  ['Hoàng Khôi', 'Las Vegas, NV'],
  ['Hồ Anh Tuấn', 'San Jose, CA', 'USA', 'Retired', 'ho-anh-tuan.jpg'],
  ['Huỳnh Ngọc Minh', 'France', 'Paris', 'Retired', 'huynh-ngoc-minh.jpg'],
  // L
  ['Lâm Thế Hùng', 'Atlanta, GA', 'USA', 'Retired', 'lam-the-hung.jpg'],
  ['Lê Kim Tuấn', 'Sài Gòn', 'Việt Nam'],
  ['Lê Minh Triết', 'Orange County, CA', 'USA', 'Retired', 'le-minh-triet.jpg'],
  ['Lê Thanh Nghĩa', 'Sài Gòn', 'Việt Nam'],
  ['Lê Văn Anh', 'France', 'Paris'],
  ['Lê Văn Tánh', 'San Jose, CA', 'USA', 'Retired', 'le-van-tanh.jpg'],
  ['Lê Xuân Sơn', 'San Jose, CA', 'USA', 'Retired', 'le-xuan-son.jpg'],
  ['Lê Xuân Trường', 'Orange County, CA', 'USA', 'Retired', 'le-xuan-truong.jpg'],
  ['Lê Hữu Nghĩa', 'Portland, OR'],
  ['Lương Bắc Việt', 'France', 'Paris'],
  ['Lương Huy Tuấn', 'Montreal', 'Canada'],
  ['Lương Thống Nhất', 'Sydney', 'Australia'],
  // N
  ['Ngô van Thịnh', 'Orange County, CA'],
  ['Nguyễn Bá Luật', 'Sài Gòn', 'Việt Nam', 'Retired', 'nguyen-ba-luat-vn.jpg'],
  ['Nguyễn Công Danh', 'Orlando, FL'],
  ['Nguyễn Đắc Bình', 'San Jose, CA'],
  ['Nguyễn Đắc Lộc', 'Seattle, WA', 'USA', 'Retired', 'nguyen-dac-loc.jpg'],
  ['Nguyễn Đình Dzinh', 'San Jose, CA', 'USA', 'Retired', 'nguyen-dinh-dzinh.jpg'],
  ['Nguyễn Đức Nam', 'Brussels', 'Begium', 'Doctor of Cardiology', 'nguyen-duc-nam.jpg'],
  ['Nguyễn Đức Tân', 'Virginia, VA', 'USA', 'Retired', 'nguyen-duc-tan.jpg'],
  ['Nguyễn Đức Vân', 'Orange County, CA'],
  ['Nguyễn Hoàng Tân', 'Whittier, CA'],
  ['Nguyễn Hoàng Vũ', 'Virginia, VA', 'USA', 'Retired', 'nguyen-hoang-vu.jpg'],
  ['Nguyễn Hữu Đức', 'Sài Gòn', 'Việt Nam', 'Retired', 'nguyen-huu-duc-vn.jpg'],
  ['Nguyễn Hữu Trung', 'San Antonio, TX'],
  ['Nguyễn Khắc Nam', 'Orange County, CA', 'USA', 'Retired', 'nguyen-khac-nam.jpg'],
  ['Nguyễn Khả Nhân', 'Sài Gòn', 'Việt Nam'],
  ['Nguyễn Minh Hiến', 'Orange County, CA', 'USA', 'Retired'],
  ['Nguyễn Nghi Quân', 'Oklahoma', 'USA', 'Retired',],
  ['Nguyễn Ngọc Quân', 'Sài Gòn', 'Việt Nam','Retired','nguyen-ngoc-quan-vn.jpg'],
  ['Nguyễn Ngọc Liên', 'Orange County, CA', 'USA', 'Retired', 'nguyen-ngoc-lien.jpg'],
  ['Nguyễn Ngọc Trang', 'Sài Gòn', 'Việt Nam'],
  ['Nguyễn Nhựt Nam', 'France', 'Paris'],
  ['Nguyễn Phúc Vĩnh Thuần', 'Orange County, CA'],
  ['Nguyễn Quang Vinh', 'Orlando, FL', 'USA', 'Retired', 'nguyen-quang-vinh.jpg'],
  ['Nguyễn Tiến Dũng', 'Orange County, CA', 'USA', 'Retired', 'nguyen-tien-dung.jpg'],
  ['Nguyễn Văn Lộc', 'Sài Gòn', 'Việt Nam'],
  ['Nguyễn Văn Thọ', 'Sài Gòn', 'Việt Nam'],
  ['Nguyễn Quang Tiền', 'Sài Gòn', 'Việt Nam', 'Retired', 'nguyen-quang-tien.jpg'],
  ['Nguyễn Xuân Sơn', 'Portland, OR'],
  ['Nguyễn thái Hoàng', 'San Jose, CA', 'USA', 'Retired', 'nguyen-thai-hoang.jpg'],
  ['Nguyễn Minh Hoàng', 'Paris', 'France'],
  ['Nguyễn Văn Cường', 'France', 'Paris'],
  // P
  ['Phan Duc Tri', 'France', 'Paris'],
  ['Phan Hữu Tài', 'Chicago, IL', 'USA', 'Retired', 'phan-huu-tai.jpg'],
  ['Phan Quang Cẩn', 'San Jose, CA'],
  ['Phan Thanh Phương', 'Portland, OR'],
  ['Phạm Đức Tấn', 'Orange County, CA', 'USA', 'Retired', 'pham-duc-tan.jpg'],
  ['Phạm Khánh Linh', 'Orange County, CA', 'USA', 'Retired', 'pham-khanh-linh.jpg'],
  ['Phạm Mạnh Quân', 'Orange County, CA'],
  ['Phạm Ngọc Vĩnh', 'Orange County, CA', 'USA', 'Retired', 'pham-ngoc-vinh-e.jpg'],
  ['Phạm Ngọc Vinh', 'Orange County, CA', 'USA', 'Retired', 'pham-ngoc-vinh-a.jpg'],
  ['Phùng Ký', 'Las Vegas, NV', 'USA', 'Retired', 'phung-ky.jpg'],
  // T
  ['Tạ Chiến Thắng', 'Orange County, CA', 'USA', 'Retired', 'ta-chien-thang.jpg'],
  ['Tạ Thanh Hòa', 'Orange County, CA'],
  ['Tạ Thanh Vũ', 'San Francisco, CA'],
  ['Thái Phi Giao', 'Houston, TX'],
  ['Tô Tiến Long', 'Montreal', 'Canada'],
  ['Trần Anh Tuấn', 'Sài Gòn', 'Việt Nam', 'Retired', 'tran-anh-tuan-vn.jpg'],
  ['Trần Hoàn Vũ', 'Las Vegas, NV'],
  ['Trần Hữu Khải', 'Houston, TX', 'USA', 'Retired', 'tran-huu-khai.jpg'],
  ['Trần Tấn Luật ', 'Orange County, CA', 'USA', 'Retired'],
  ['Trần Kim Khánh', 'France', 'Paris'],
  ['Trần Long Nhi', 'Sài Gòn', 'Việt Nam'],
  ['Trần Nguyễn Đình Khánh', 'Melbourne, FL'], 
  ['Trần Nguyễn Linh Vũ', 'San Jose, CA'],
  ['Trần Văn Ngọc', 'Sài Gòn', 'Việt Nam'],
  ['Trịnh Bửu Sơn', 'Frankfurt', 'Germany'],
  ['Trịnh Ngọc Huy', 'San Jose, CA', 'USA', 'MD Gastroenterology'],
  ['Trương Sĩ Phương', 'Montreal', 'Canada'],
  // V
  ['Võ Khắc Hiếu', 'Orange County, CA', 'USA', 'Retired', 'vo-khac-hieu.jpg'],
  ['Võ Phú Hải', 'Sài Gòn', 'Việt Nam'],
  ['Võ Tiến Dũng', 'Dallas, Texas'],
  ['Võ Văn Hòa', 'Sài Gòn', 'Việt Nam'],
  ['Vũ Hán Linh', 'France', 'Paris'],
  ['Vũ Quốc Hưng', 'Virginia, VA', 'USA', 'Retired'],
  ['Vũ Xuân Đạt', 'Fairfax, VA', 'USA', 'Retired', 'vu-xuan-dat.jpg'],
]
 
  
export const alumni = RAW.map(([name, location, country = 'USA', profession = 'Retired', photo = null], i) => ({
  id: i + 1,
  name,
  gradYear: 1977,
  location,
  country,
  profession,
  company: '',
  photo: photo ? `/photos/alumni/${photo}` : null,
  bio: bioFor(location),
  initials: initialsOf(name),
  gradient: GRADIENTS[i % GRADIENTS.length],
}))
