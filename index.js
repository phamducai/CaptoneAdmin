let productList = [];
async function getdata() {
  try {
    let { data } = await axios({
      url: "https://6343863c3f83935a7854ae81.mockapi.io/captone",
      method: "GET",
    });
    productList = mapData(data);
    renderHtml(productList);
  } catch (error) {
    console.log(error);
  }
}

function mapData(data) {
  if (!data) data = productList;
  const result = [];
  for (let i = 0; i < data.length; i++) {
    const oldProduct = data[i];
    const newProduct = new Products(
      oldProduct.id,
      oldProduct.name,
      oldProduct.price,
      oldProduct.screen,
      oldProduct.backCamera,
      oldProduct.frontCamera,
      oldProduct.img,
      oldProduct.desc,
      oldProduct.type
    );
    result.push(newProduct);
  }
  return result;
}

function renderHtml(data) {
  if (!data) data = productList;
  for (let index in data) {
    document.getElementById("renderTable").innerHTML += `<tr>
    <th scope="row" class="text-center">${+index + 1}</th>
  <td>${data[index].name}</td>
  <td class="text-center">$${data[index].price}</td>
  <td>
  <img
    src="${data[index].img}"
    alt=""
    style="width: 60px; height: 52;margin: auto; display: block;"
  />
</td>
  <td>${data[index].desc}</td>
  <td > <button class="btn btn-success " id="view-${
    data[index].id
  }"type="button"  
  data-bs-toggle="modal"
  data-bs-target="#uModal"
  onclick="getData(${
    data[index].id
  })"><i class="fa-solid fa-eye"></i>View</button>
  <button class="btn btn-danger id="delete-${data[index].id}" onclick="Delete(${
      data[index].id
    })">
    <i class="fa-solid fa-trash"></i>Delete
  </button></td> </tr>`;
  }
}

window.onload = async function () {
  await getdata();
};

function saveChange() {
  let id = document.getElementById("itemName").value;
  let nameItem = document.getElementById("itemName").value;
  let itemPrice = document.getElementById("itemPrice").value;
  let itemScreen = document.getElementById("itemScreen").value;
  let itemBackCamera = document.getElementById("itemBackCamera").value;
  let itemFrontCamera = document.getElementById("itemFrontCamera").value;
  let itemImg = document.getElementById("itemImg").value;
  let itemDesc = document.getElementById("itemDesc").value;
  let itemType = document.getElementById("itemType").value;

  let newProduct = new Products(
    id,
    nameItem,
    itemPrice,
    itemScreen,
    itemBackCamera,
    itemFrontCamera,
    itemImg,
    itemDesc,
    itemType
  );
  let value = validation(
    nameItem,
    "postName",
    itemPrice,
    "postPrice",
    itemScreen,
    "postScreen",
    itemBackCamera,
    "postBackCamera",
    itemFrontCamera,
    "postFrontCamera",
    itemImg,
    "postImg",
    itemType,
    "postType",
    itemDesc,
    "postDesc"
  );
  if (!value) {
    console.log("ditmemay");
    return;
  }
  document.getElementById("closePost").click();
  axios({
    url: "https://6343863c3f83935a7854ae81.mockapi.io/captone",
    method: "POST",
    data: newProduct,
  })
    .then(function (res) {
      console.log(res);
      document.getElementById("renderTable").innerHTML = "";
      getdata();
    })
    .catch(function (err) {
      console.log(err);
    });
}

function Delete(idButton) {
  for (let item of productList) {
    if (+item.id === idButton) {
      axios({
        url: "https://6343863c3f83935a7854ae81.mockapi.io/captone/" + idButton,
        method: "DELETE",
      })
        .then(function (res) {
          console.log(res);
          document.getElementById("renderTable").innerHTML = "";
          getdata();
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  }
}

function getData(idButton) {
  for (item of productList) {
    if (+item.id === idButton) {
      document.getElementById(
        "renderModal"
      ).innerHTML = `<div class="modal-body"><div class="form-group">
<label>Tên Sản Phẩm</label>
<input
  id="getitemName"
  class="form-control"
  value="${item.name}"
 
/> <span id="updateName"></span>

</div>
<div class="form-group">
<label>Giá</label>
<input
  id="getitemPrice"
  class="form-control"
  value="${item.price}"
/>  <span id="updatePrice"></span>
</div>
<div class="form-group">
<label>Màn hình</label>
<input
  id="getitemScreen"
  class="form-control"
  value="${item.screen}"
/>
<span id="updateScreen"></span>
</div>
<div class="form-group">
<label> Back Camera </label>
<input
  id="getitemBackCamera"
  class="form-control"
  value="${item.backCamera}"
/>
<span id="updateBackCamera"></span>
</div>
<div class="form-group">
<label> Front Camera </label>
<input
  id="getitemFrontCamera"
  class="form-control"
  value="${item.frontCamera}"
/><span id="updateFrontCamera"></span>
</div>
<div class="form-group">
<label>Hình Ảnh</label>
<input
  id="getitemImg"
  class="form-control"
  value="${item.img}"
/><span id="updateImg"></span>

</div>

<div class="form-group">
<label>Type</label>
<input
  id="getitemType"
  class="form-control"
  value="${item.type}"
/><span id="updateType"></span>
</div>
<div class="form-group">
<label>Mô tả</label>
<textarea
  class="form-control"
  name=""
  id="getitemDesc"
  cols="30"
  rows="4"
  
>${item.desc}</textarea>
<span id="updateDesc"></span>
</div></div> <div class="modal-footer">
<button
  type="button"
  class="btn btn-secondary"
  data-bs-dismiss="modal"
  id="buttonClose"
>
  Close
</button>
<button
  type="button"
  class="btn btn-primary"  
  onclick="updateItem(${item.id})"
>
  Update Product
</button>
</div>`;
    }
  }
}
function updateItem(idButton) {
  let nameItem = document.getElementById("getitemName").value;
  let itemPrice = document.getElementById("getitemPrice").value;
  let itemScreen = document.getElementById("getitemScreen").value;
  let itemBackCamera = document.getElementById("getitemBackCamera").value;
  let itemFrontCamera = document.getElementById("getitemFrontCamera").value;
  let itemImg = document.getElementById("getitemImg").value;
  let itemDesc = document.getElementById("getitemDesc").value;
  let itemType = document.getElementById("getitemType").value;
  let updateItem = new Products(
    idButton,
    nameItem,
    itemPrice,
    itemScreen,
    itemBackCamera,
    itemFrontCamera,
    itemImg,
    itemDesc,
    itemType
  );
  let value = validation(
    nameItem,
    "updateName",
    itemPrice,
    "updatePrice",
    itemScreen,
    "updateScreen",
    itemBackCamera,
    "updateBackCamera",
    itemFrontCamera,
    "updateFrontCamera",
    itemImg,
    "updateImg",
    itemType,
    "updateType",
    itemDesc,
    "updateDesc"
  );
  if (!value) {
    console.log("ditmemay");
    return;
  }

  document.getElementById("buttonClose").click();
  axios({
    url: "https://6343863c3f83935a7854ae81.mockapi.io/captone/" + idButton,
    method: "PUT",
    data: updateItem,
  })
    .then(function (res) {
      document.getElementById("renderTable").innerHTML = "";
      getdata();
    })
    .catch(function (err) {
      console.log(err);
    });
}
function searchItem() {
  let result = [];
  let keyWord = document
    .getElementById("seachItemInProducts")
    .value.toLowerCase()
    .trim();
  for (let item of productList) {
    if (item.name.toLowerCase().includes(keyWord)) {
      result.push(item);
    }
  }
  document.getElementById("renderTable").innerHTML = "";
  renderHtml(result);
}

//VALIDATION
function required(val, spanId, nameinPut) {
  if (val.length === 0) {
    document.getElementById(spanId).innerHTML = "*Trường này bắt buộc nhập";
    return false;
  }
  document.getElementById(spanId).innerHTML = "";
  document.getElementById(spanId).style.display = "none";
  return true;
}

// pattern
function checkPattern(val, spanId, pattern, nameinPut) {
  if (pattern.test(val)) {
    document.getElementById(spanId).innerHTML = "";
    document.getElementById(spanId).style.display = "none";
    return true;
  }
  document.getElementById(spanId).innerHTML = `*${nameinPut} không hợp lệ`;
  document.getElementById(spanId).style.display = "inline-block";
  return false;
}

function validation(
  name,
  spanIdName,
  price,
  spanIdPrice,
  screen,
  spanIdScreen,
  backCamera,
  spanIdBackcamera,
  frontCamera,
  spanIdFrontcamera,
  img,
  spanIdImg,
  type,
  spanType,
  desc,
  spanIdDesc
) {
  let isValid = true;
  const patternName =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]|| ([A-Z])\w +$/g;

  const patternPrice = /^\d+$/g;
  const patternScreen = /[a-zA-Z0-9\+]/g;
  const patternBackCamera =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]||[a-zA-Z0-9\+]/g;
  const patterFrontCamera =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]||[a-zA-Z0-9\+]/g;
  const patterDesc =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]||[a-zA-Z0-9\+]/g;
  const patternImg =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g;
  const patternType =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]||[a-zA-Z0-9\+]/g;

  isValid &=
    required(name, spanIdName, "Sản phẩm") &&
    checkPattern(name, spanIdName, patternName, "Sản phẩm");

  isValid &=
    required(price, spanIdPrice, "Giá sản phẩm") &&
    checkPattern(price, spanIdPrice, patternPrice, "Giá sản phẩm");
  isValid &=
    required(screen, spanIdScreen, "Màn hình") &&
    checkPattern(screen, spanIdScreen, patternScreen, "Màn hình");
  isValid &=
    required(backCamera, spanIdBackcamera, "Thông số Backcamera") &&
    checkPattern(
      backCamera,
      spanIdBackcamera,
      patternBackCamera,
      "Thông số Backcamera"
    );
  isValid &=
    required(frontCamera, spanIdFrontcamera, "Thông số Frontcamera") &&
    checkPattern(
      frontCamera,
      spanIdFrontcamera,
      patterFrontCamera,
      "Thông số Frontcamera"
    );
  isValid &=
    required(desc, spanIdDesc, "Mô tả") &&
    checkPattern(desc, spanIdDesc, patterDesc, "Mô tả");
  isValid &=
    required(img, spanIdImg, "Link hình ảnh") &&
    checkPattern(img, spanIdImg, patternImg, "Link hình ảnh");
  isValid &=
    required(type, spanType, "Loại") &&
    checkPattern(type, spanType, patternType, "Loại");

  return isValid;
}
