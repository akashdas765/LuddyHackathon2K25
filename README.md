## 1. Install Python dependencies
!pip install -r requirements.txt

## 2. Install Node dependencies
!npm install

## 3. Run the Python backend in the background
!nohup python Scripts/app.py &

## 4. Run the React frontend (foreground)
!npm run dev
