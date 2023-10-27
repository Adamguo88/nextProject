練習專案

# 介紹
總共需要開啟3個終端，這個練習項目才能正常使用。這是一個Next.js 13 App Router的練習專案，UI使用了ANTD套件庫。
使用next13 middleware設置登入/沒登入可訪問權限，

* 10/27 新增禁止重複登入功能 / 關閉全部分頁自動登出功能
  * 1. 當帳號A，被同時登入的時候，前者會被後者踢出，並且前者會收到通知
    2. 當關閉全部分頁的時候，下次再次訪問頁面，會進入prisma獲取登入狀態，如登入狀態是"N"，則會自動登出 (還能優化) 
* 10/26 新增express 實現WebSocket，多人即時聊天室

# 帳號
1. 帳號: Adam 密碼 b001
2. 帳號: Jeff 密碼 b001
3. 帳號: Admin 密碼 b001



# Step
##### 1. cd nextProject
##### 2. npm run dev:next
##### 3. npm run dev:express
##### 4. npx prisma studio

