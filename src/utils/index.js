

export class NumberToChinese {
  constructor() {
    this.chnNumChar = [
      "零",
      "一",
      "二",
      "三",
      "四",
      "五",
      "六",
      "七",
      "八",
      "九"
    ];
    this.chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
    this.chnUnitChar = ["", "十", "百", "千"];
  }

  SectionToChinese(section) {
    var strIns = "",
      chnStr = "";
    var unitPos = 0;
    var zero = true;
    while (section > 0) {
      var v = section % 10;
      if (v === 0) {
        if (!zero) {
          zero = true;
          chnStr = this.chnNumChar[v] + chnStr;
        }
      } else {
        zero = false;
        strIns = this.chnNumChar[v];
        strIns += this.chnUnitChar[unitPos];
        chnStr = strIns + chnStr;
        // console.log(chnStr)
      }
      unitPos++;
      section = Math.floor(section / 10);
    }
    return chnStr;
  }

  fromTo(num) {
    var unitPos = 0;
    var strIns = "",
      chnStr = "";
    var needZero = false;

    if (num === 0) {
      return this.chnNumChar[0];
    }

    while (num > 0) {
      var section = num % 10000;
      if (needZero) {
        chnStr = this.chnNumChar[0] + chnStr;
      }
      strIns = this.SectionToChinese(section);
      strIns += section !== 0 ? this.chnUnitSection[unitPos] : this.chnUnitSection[0];
      chnStr = strIns + chnStr;
      needZero = section < 1000 && section > 0;
      num = Math.floor(num / 10000);
      unitPos++;
    }

    return chnStr;
  }
}
