// Cho 2 mảng week, calendars, sắp xếp các booking trong calendars theo date trong mảng week
const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const calendars = [
  {
    date: "Wed",
    room: "Mars",
    team: "FE",
  },
  {
    date: "Sun",
    room: "Saturn",
    team: "IOS",
  },
  {
    date: "Wed",
    room: "Mars",
    team: "FE",
  },
  {
    date: "Sun",
    room: "Saturn",
    team: "IOS",
  },
  {
    date: "Mon",
    room: "Mars",
    team: "FE",
  },
  {
    date: "Fri",
    room: "Saturn",
    team: "IOS",
  },
];

const sortCalendar = () => {
  const result = [];
  week.forEach((date) => {
    result.push({
      date: date,
      booking: calendars.filter((calendar) => {
        return calendar.date == date;
      }),
    });
  });
  return result;
};

console.log(sortCalendar());

// Cách tối ưu
const obj = {};
calendars.map((item) => {
  // Kiểm tra có item.date trong obj chưa
  if (obj?.[item.date]) {
    // Nếu chưa thì khởi tạo 1 mảng rỗng []
    obj[item.date] = [];
  }
  // Nếu có rồi thì không làm gì

  // Push item vào mảng
  obj[item.date].push(item);
});

// Kết quả
// obj = {
//   Mon: {},
//   Tue: {},
//   ...
// }

// Trước khi lặp thì dùng Sort để xếp gần nhau và giảm quán tính của máy tính: Nên dùng sort data trước khi xử lý

// Input a, b
// Output a > b : a+b, a<=b: (a+b)*3

function bai1(a, b) {
  if (a > b) return a + b;
  return (a + b) * 3;
}

function bai1_2(a, b) {
  return a > b ? a + b : (a + b) * 3;
}

// NOTE: Giữa toán tử và dấu phải cách ra

// --------------------------------------------------------------------------------------------------------------------
// Input "1*4"
// lưu vào 1 mảng đổi dấu * thành các số từ 1 -> 9, lấy các số chia hết cho 3
function bai2(str) {
  var arr = [];
  if (str.indexOf("*")) {
    for (var i = 0; i < 10; i++) {
      var a = +str.replace("*", i);
      if (a % 3 === 0) {
        arr.push(a);
      }
    }
  }
  console.log(arr);
}

bai2("1*4");
