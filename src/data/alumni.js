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

const RAW = [
  // B
  ['Bành Đình Tuấn', 'France', 'Paris', 'Dentist'],
  ['Bảo Hùng', 'Houston, TX'],
  ['Bùi Duy Thiện', 'San Jose, CA', 'USA', 'Dentist'],
  ['Bùi Đức Tiến', 'Sydney', 'Australia'],
  ['Bùi Hữu Tín', 'Sài Gòn', 'Việt Nam'],
  ['Bùi Văn Dũng', 'Orange County, CA'],
  ['Bùi Tấn Quốc Bắc', 'Orange County, CA'],
  // C
  ['Chu Mạnh Tuyến', 'London', 'United Kingdom'],
  // Đ
  ['Đặng Thanh Liêm', 'France', 'Paris'],
  ['Đặng Tùng Lâm', 'Sài Gòn', 'Việt Nam'],
  ['Đỗ Thanh Sơn', 'Orange County, CA'],
  ['Dương Quốc Vũ', 'Orange County, CA', 'USA', 'DDS'],
  // H
  ['Hoàng Đức Tường', 'San Jose, CA'],
  ['Hoàng Khôi', 'Las Vegas, NV'],
  ['Hồ Anh Tuấn', 'San Jose, CA'],
  ['Huỳnh Ngọc Minh', 'France', 'Paris'],
  // L
  ['Lâm Phi Hùng', 'Atlanta, GA'],
  ['Lê Kim Tuấn', 'Sài Gòn', 'Việt Nam'],
  ['Lê Minh Triết', 'Orange County, CA'],
  ['Lê Thanh Nghĩa', 'Sài Gòn', 'Việt Nam'],
  ['Lê Văn Anh', 'France', 'Paris'],
  ['Lê Văn Tánh', 'San Jose, CA'],
  ['Lê Xuân Sơn', 'San Jose, CA'],
  ['Lê Xuân Trường', 'Orange County, CA'],
  ['Lê Hữu Nghĩa', 'Portland, OR'],
  ['Lương Bắc Việt', 'France', 'Paris'],
  ['Lương Huy Tuấn', 'Montreal', 'Canada'],
  ['Lương Thống Nhất', 'Sydney', 'Australia'],
  // N
  ['Ngô Thịnh', 'Orange County, CA'],
  ['Nguyễn Bá Luật', 'Orange County, CA'],
  ['Nguyễn Công Danh', 'Orlando, FL'],
  ['Nguyễn Đắc Bình', 'San Jose, CA'],
  ['Nguyễn Đắc Lộc', 'Seattle, WA'],
  ['Nguyễn Đình Dzinh', 'San Jose, CA'],
  ['Nguyễn Đức Nam', 'Brussels', 'Begium', 'Doctor of Cardiology'],
  ['Nguyễn Đức Tân', 'Virginia, VA'],
  ['Nguyễn Đức Vân', 'Orange County, CA'],
  ['Nguyễn Hoàng Tân', 'Whittier, CA'],
  ['Nguyễn Hoàng Vũ', 'Virginia, VA'],
  ['Nguyễn Hữu Đức', 'Sài Gòn', 'Việt Nam'],
  ['Nguyễn Hữu Trung', 'San Antonio, TX'],
  ['Nguyễn Khắc Nam', 'Orange County, CA'],
  ['Nguyễn Khả Nhân', 'Sài Gòn', 'Việt Nam'],
  ['Nguyễn Minh Hiền', 'Orange County, CA'],
  ['Nguyễn Nghi Quân', 'Sài Gòn', 'Việt Nam'],
  ['Nguyễn Ngọc Liên', 'Orange County, CA'],
  ['Nguyễn Ngọc Trang', 'Sài Gòn', 'Việt Nam'],
  ['Nguyễn Nhựt Nam', 'France', 'Paris'],
  ['Nguyễn Phúc Vinh Thuận', 'Orange County, CA'],
  ['Nguyễn Quang Vinh', 'Orlando, FL'],
  ['Nguyễn Tiến Dũng', 'Orange County, CA'],
  ['Nguyễn Văn Lộc', 'Sài Gòn', 'Việt Nam'],
  ['Nguyễn Văn Thọ', 'Sài Gòn', 'Việt Nam'],
  ['Nguyễn Quang Tiền', 'Sài Gòn', 'Việt Nam'],
  ['Nguyễn Xuân Sơn', 'Portland, OR'],
  // P
  ['Phan Duc Tri', 'France', 'Paris'],
  ['Phan Hữu Tài', 'Chicago, IL'],
  ['Phan Quang Cẩn', 'San Jose, CA'],
  ['Phan Thanh Phương', 'Portland, OR'],
  ['Phạm Đức Tấn', 'Orange County, CA'],
  ['Phạm Khánh Linh', 'Orange County, CA'],
  ['Phạm Mạnh Quân', 'Orange County, CA'],
  ['Phạm Ngọc Vĩnh', 'Orange County, CA'],
  ['Phạm Ngọc Vinh', 'Orange County, CA'],
  ['Phùng Ký', 'Las Vegas, NV'],
  // T
  ['Tạ Chiến Thắng', 'Orange County, CA'],
  ['Tạ Thanh Hòa', 'Orange County, CA'],
  ['Tạ Thanh Vũ', 'San Francisco, CA'],
  ['Thái Phi Giao', 'Houston, TX'],
  ['Tô Tiến Long', 'Montreal', 'Canada'],
  ['Trần Anh Tuấn', 'Sài Gòn', 'Việt Nam'],
  ['Trần Hoàn Vũ', 'Las Vegas, NV'],
  ['Trần Hữu Khải', 'Houston, TX'],
  ['Trần Kim Khánh', 'France', 'Paris'],
  ['Trần Long Nhi', 'Sài Gòn', 'Việt Nam'],
  ['Trần Nguyễn Đình Khánh', 'Melbourne, FL'],
  ['Trần Nguyễn Linh Vũ', 'San Jose, CA'],
  ['Trần Văn Ngọc', 'Sài Gòn', 'Việt Nam'],
  ['Trịnh Bửu Sơn', 'Frankfurt', 'Germany'],
  ['Trịnh Ngọc Huy', 'San Jose, CA', 'USA', 'MD Gastroenterology'],
  ['Trương Sĩ Phương', 'Montreal', 'Canada'],
  // V
  ['Võ Hiếu', 'Orange County, CA'],
  ['Võ Phú Hải', 'Sài Gòn', 'Việt Nam'],
  ['Võ Tiến Dũng', 'Dallas, Texas'],
  ['Võ Văn Hòa', 'Sài Gòn', 'Việt Nam'],
  ['Vũ Dương', 'Orange County, CA', 'USA', 'Dentist'],
  ['Vũ Hân Linh', 'France', 'Paris'],
  ['Vũ Quốc Hưng', 'San Jose, CA'],
  ['Vũ Xuân Đạt', 'Fairfax, VA'],
]
 
  
export const alumni = RAW.map(([name, location, country = 'USA', profession = 'Retired'], i) => ({
  id: i + 1,
  name,
  gradYear: 1977,
  location,
  country,
  profession,
  company: '',
  bio: bioFor(location),
  initials: initialsOf(name),
  gradient: GRADIENTS[i % GRADIENTS.length],
}))
