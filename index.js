// ここから書いてください。
const battery = [
  {
    batteryName: "WKL-78",
    capacityAh: 2.3,
    voltage: 14.4,
    maxDraw: 3.2,
    endVoltage: 10,
  },
  {
    batteryName: "WKL-140",
    capacityAh: 4.5,
    voltage: 14.4,
    maxDraw: 9.2,
    endVoltage: 5,
  },
  {
    batteryName: "Wmacro-78",
    capacityAh: 2.5,
    voltage: 14.5,
    maxDraw: 10,
    endVoltage: 5,
  },
  {
    batteryName: "Wmacro-140",
    capacityAh: 3.6,
    voltage: 14.4,
    maxDraw: 14,
    endVoltage: 5,
  },
  {
    batteryName: "IOP-E78",
    capacityAh: 6.6,
    voltage: 14.4,
    maxDraw: 10.5,
    endVoltage: 8,
  },
  {
    batteryName: "IOP-E140",
    capacityAh: 9.9,
    voltage: 14.4,
    maxDraw: 14,
    endVoltage: 10,
  },
  {
    batteryName: "IOP-E188",
    capacityAh: 13.2,
    voltage: 14.4,
    maxDraw: 14,
    endVoltage: 11,
  },
  {
    batteryName: "RYN-C65",
    capacityAh: 4.9,
    voltage: 14.8,
    maxDraw: 4.9,
    endVoltage: 11,
  },
  {
    batteryName: "RYN-C85",
    capacityAh: 6.3,
    voltage: 14.4,
    maxDraw: 6.3,
    endVoltage: 12,
  },
  {
    batteryName: "RYN-C140",
    capacityAh: 9.8,
    voltage: 14.8,
    maxDraw: 10,
    endVoltage: 12,
  },
  {
    batteryName: "RYN-C290",
    capacityAh: 19.8,
    voltage: 14.4,
    maxDraw: 14,
    endVoltage: 12,
  },
];
const camera = [
  {
    brand: "Cakon",
    model: "ABC 3000M",
    powerConsumptionWh: 35.5,
  },
  {
    brand: "Cakon",
    model: "ABC 5000M",
    powerConsumptionWh: 37.2,
  },
  {
    brand: "Cakon",
    model: "ABC 7000M",
    powerConsumptionWh: 39.7,
  },
  {
    brand: "Cakon",
    model: "ABC 9000M",
    powerConsumptionWh: 10.9,
  },
  {
    brand: "Cakon",
    model: "ABC 9900M",
    powerConsumptionWh: 15.7,
  },
  {
    brand: "Go MN",
    model: "UIK 110C",
    powerConsumptionWh: 62.3,
  },
  {
    brand: "Go MN",
    model: "UIK 210C",
    powerConsumptionWh: 64.3,
  },
  {
    brand: "Go MN",
    model: "UIK 230C",
    powerConsumptionWh: 26.3,
  },
  {
    brand: "Go MN",
    model: "UIK 250C",
    powerConsumptionWh: 15.3,
  },
  {
    brand: "Go MN",
    model: "UIK 270C",
    powerConsumptionWh: 20.3,
  },
  {
    brand: "VANY",
    model: "CEV 1100P",
    powerConsumptionWh: 22,
  },
  {
    brand: "VANY",
    model: "CEV 1300P",
    powerConsumptionWh: 23,
  },
  {
    brand: "VANY",
    model: "CEV 1500P",
    powerConsumptionWh: 24,
  },
  {
    brand: "VANY",
    model: "CEV 1700P",
    powerConsumptionWh: 25,
  },
  {
    brand: "VANY",
    model: "CEV 1900P",
    powerConsumptionWh: 26,
  },
];

//html elementを取得する
const config = {
  brandMenu: document.getElementById("brand-menu"),
  modelMenu: document.getElementById("model-menu"),
  apcForm: document.getElementById("apc-form"),
  batteryContainer: document.getElementById("batteryContainer"),
};

//カメラの情報を取得する関数
const cameraInfo = {
  //カメラのブランド:String[]を取得する
  getAllBrand: function (cameraArr) {
    let hashmap = {};
    for (let i = 0; i < cameraArr.length; i++) {
      if (hashmap[cameraArr[i].brand] === undefined) {
        hashmap[cameraArr[i].brand] = cameraArr[i].brand;
      }
    }
    return Object.keys(hashmap);
  },

  //ブランドが変更されると発火する
  //ブランドに対応したモデルと、バッテリーを提案する
  changeBrand: function () {
    cameraInfo.setModel(config.brandMenu.value);
    cameraInfo.changeCameraInfo();
  },

  //ブランド名のoption要素を作成し、selectにappend
  setBrand: function () {
    const brand = cameraInfo.getAllBrand(camera);

    for (let i = 0; i < brand.length; i++) {
      let op = document.createElement("option");
      op.value = brand[i];
      op.text = brand[i];
      config.brandMenu.append(op);
    }
  },

  //ブランド名を受け取り、対応するモデルのoption要素を作成、selectにappend
  setModel: function (brandName) {
    config.modelMenu.textContent = null;

    for (let i = 0; i < camera.length; i++) {
      if (camera[i].brand === brandName) {
        let op = document.createElement("option");
        op.value = i;
        op.text = camera[i].model;
        config.modelMenu.append(op);
      }
    }
  },

  //カメラとアクセサリーの消費電力を足した合計を算出する
  getTotalPowerConsumptionWh: function () {
    if (config.modelMenu.value === "") return;
    else if (config.apcForm.value === "") {
      return camera[config.modelMenu.value].powerConsumptionWh;
    } else
      return (
        camera[config.modelMenu.value].powerConsumptionWh +
        parseInt(config.apcForm.value, 10)
        // config.apcForm.value
      );
  },

  //フォームの情報が変更されたときに発火する関数
  //カメラとアクセサリーの条件に合ったバッテリーを表示する
  changeCameraInfo: function () {
    let totalPowerConsumptionWh = cameraInfo.getTotalPowerConsumptionWh();
    let batteryList = batteryInfo.getBatteryList(totalPowerConsumptionWh);
    let batteryDivs = batteryInfo.getBatteryLife(
      totalPowerConsumptionWh,
      batteryList
    );
    batteryInfo.setBattery(batteryDivs);
  },
};

//バッテリーの情報を取得する関数
const batteryInfo = {
  getPowerCapacityWh: function () {
    let powerCapacityWh = {};
    for (let i = 0; i < battery.length; i++) {
      if (powerCapacityWh[battery[i].batteryName] === undefined)
        powerCapacityWh[battery[i].batteryName] =
          battery[i].voltage * battery[i].capacityAh;
    }
    return powerCapacityWh;
  },

  getMaxDischargePower: function () {
    let maxDischargePower = {};
    for (let i = 0; i < battery.length; i++) {
      if (maxDischargePower[battery[i].batteryName] === undefined)
        maxDischargePower[battery[i].batteryName] =
          battery[i].endVoltage * battery[i].endVoltage;
    }
    return maxDischargePower;
  },

  setBattery: function (batteryDivs) {
    config.batteryContainer.textContent = null;
    for (let i = 0; i < batteryDivs.length; i++) {
      batteryContainer.append(batteryDivs[i]);
    }
  },

  getBatteryList: function (totalPowerConsumptionWh) {
    let batteryList = [];

    for (let i = 0; i < valueOfBatteryMaxDischargePower.length; i++) {
      if (totalPowerConsumptionWh < valueOfBatteryMaxDischargePower[i]) {
        batteryList.push(Object.keys(batteryMaxDischargePower)[i]);
      }
    }
    batteryList.sort();
    return batteryList;
  },

  getBatteryLife: function (totalPowerConsumptionWh, batteryList) {
    let batteryListWithLife = [];

    for (let i = 0; i < batteryList.length; i++) {
      let div = document.createElement("div");
      let h4 = document.createElement("h4");
      let h6 = document.createElement("h6");
      h4.textContent = batteryList[i];
      h6.textContent = `Estimated ${
        //小数点第一位で四捨五入する
        Math.round(
          (batteryPowerCapacityWh[batteryList[i]] / totalPowerConsumptionWh) *
            10
        ) / 10
      } hours on selected setup`;
      div.classList.add(
        "col-12",
        "d-flex",
        "justify-content-between",
        "align-items-center",
        "border",
        "py-3",
        "px-4",
        "bg-white"
      );
      div.append(h4, h6);
      batteryListWithLife.push(div);
    }

    return batteryListWithLife;
  },
};

const batteryPowerCapacityWh = batteryInfo.getPowerCapacityWh();
const batteryMaxDischargePower = batteryInfo.getMaxDischargePower();
const valueOfBatteryMaxDischargePower = Object.values(batteryMaxDischargePower);

window.onload = function () {
  config.brandMenu.onchange = cameraInfo.changeBrand;
  cameraInfo.setBrand();
  cameraInfo.setModel(config.brandMenu.value);
  cameraInfo.changeCameraInfo();
  config.modelMenu.onchange = cameraInfo.changeCameraInfo;
  config.apcForm.onchange = cameraInfo.changeCameraInfo;
};
