import time

# Establecemos el tiempo según con la estimación del entrenamiento
start = time.time() + 0 * 1 * 5 * 60 + 1 * 60 * 60 + 5 * 60 + 10 # Sumamos 12 días, 20 horas, 5 minutos y 10 segundos

# Creamos un bucle infinito para actualizar la cuenta regresiva cada segundo
while True:
    # Calculamos el tiempo restante en segundos
    remaining = start - time.time()

    # Convertimos el tiempo restante a días, horas, minutos y segundos
    days = int(remaining // (24 * 60 * 60))
    hours = int((remaining % (24 * 60 * 60)) // (60 * 60))
    minutes = int((remaining % (60 * 60)) // 60)
    seconds = int(remaining % 60)

    # Mostramos el tiempo restante en la consola
    print(f"Tiempo restante para completar el entrenamiento: {days} días, {hours} horas, {minutes} minutos y {seconds} segundos")

    # Esperamos 1 segundo antes de actualizar la cuenta regresiva de nuevo
    time.sleep(1)
