# Vue 練習作品 - 飲食紀錄網站 Healthy Journey 
主要功能：計算TDEE並且記錄一天所攝取的熱量

### Demo: https://my-healthy-journey.netlify.app/
- 測試帳號如下，也可以自行註冊一個帳號

  - 帳號: user01@test.com 
  - 密碼: pwd123 （請勿更改密碼）

- 伺服器使用Render免費方案，因此第一次發送請求要等比較久，請見諒

## 使用技術
前端
- Vue3
- Vue-router
- Pinia
- Element UI
- axios
- sass

後端 https://github.com/kay1040/food-diary-backend
- Express.js
- MongoDB

## 頁面展示
### 首頁

首頁打字效果

![home](https://github.com/kay1040/food-diary/assets/112454167/838e91de-b4bc-4e7a-b673-c296c8ddbd90)

### 註冊 / 登入

![signup](https://github.com/kay1040/food-diary/assets/112454167/d97db26a-facc-4952-8cbe-6b083bd0b4c2)


### 身體資料表單

註冊完成需填寫身體資料，以計算TDEE

![form](https://github.com/kay1040/food-diary/assets/112454167/c2943de9-5045-4f3f-a236-6f2922a8fd6e)

### 使用者菜單

資料填寫完畢會跳轉到 User Information，可以點擊右上角 user icon 開啟使用者菜單跳轉頁面

![menu](https://github.com/kay1040/food-diary/assets/112454167/e0f60631-9637-4c1f-a9a3-b62eca43b1fc)

### 飲食紀錄

計算一天所攝取的總熱量，再用TDEE扣除總熱量得到剩餘熱量

<img src="https://github.com/kay1040/food-diary/assets/112454167/3fd1054b-d32d-4805-a4b3-26461246e8de" width="952" alt="newProducts">

新增食物

串接USDA美國農業部API，可以點擊搜尋按鈕查詢食物的熱量

![addFood1](https://github.com/kay1040/food-diary/assets/112454167/02d3bd1a-9d41-422b-acfe-0f9b1e808998)

也可以自行輸入食物和熱量

![addFood2](https://github.com/kay1040/food-diary/assets/112454167/104abeb4-954c-4883-b686-0a1601fa3388)

編輯食物

![editFood](https://github.com/kay1040/food-diary/assets/112454167/a8fdf327-0ddb-4358-ac53-9b45b04a0475)

刪除食物

![deleteFood](https://github.com/kay1040/food-diary/assets/112454167/70bd5450-26ab-449c-baa9-c1e9baee62f2)

每當切換月份就會從伺服器獲取資料

![fetchData](https://github.com/kay1040/food-diary/assets/112454167/58b2820b-679a-410d-af4d-c220abf71f97)


### 使用者資料

點擊編輯按鈕可以修改使用者資料，修改後會重新計算BMR及TDEE

![userInfo](https://github.com/kay1040/food-diary/assets/112454167/0c871072-1bd2-4a6c-96b0-0244e08cea5b)

### 變更密碼

![password](https://github.com/kay1040/food-diary/assets/112454167/139f15f1-33f2-44d3-9d21-3d7c7cc47d16)

### 登出

登出後清除local storage，並跳轉回首頁

![logout](https://github.com/kay1040/food-diary/assets/112454167/82c4dc7b-a7cf-47c3-9dd8-192a5e91d61d)
