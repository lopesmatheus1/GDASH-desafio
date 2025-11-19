FROM python:3.12-slim

# Diretório de trabalho
WORKDIR /app

# Copia o requirements
COPY requirements.txt .

# Instala dependências
RUN pip install --no-cache-dir -r requirements.txt

# Copia o restante do código
COPY . .

# Comando para rodar seu script principal
CMD ["python", "-u", "main.py"]
