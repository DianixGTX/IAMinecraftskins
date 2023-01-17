const tf = require('tensorflow');
const {loadTrainingData, loadTestData, saveSkin, setSkin} = require('skinview-utils');

async function run() {
  // Primero, carga el conjunto de datos de skins de Minecraft
  const {x: xTrain, y: yTrain} = await loadTrainingData();
  const {x: xTest, y: yTest} = await loadTestData();

  // Crea un modelo de aprendizaje automático
  const model = tf.sequential();
  model.add(tf.layers.conv2d({
    inputShape: [64, 64, 3],
    kernelSize: 3,
    filters: 32,
    activation: 'relu',
  }));
  model.add(tf.layers.maxPooling2d({poolSize: [2, 2]}));
  model.add(tf.layers.conv2d({
    kernelSize: 3,
    filters: 64,
    activation: 'relu',
  }));
  model.add(tf.layers.maxPooling2d({poolSize: [2, 2]}));
  model.add(tf.layers.flatten());
  model.add(tf.layers.dense({units: 128, activation: 'relu'}));
  model.add(tf.layers.dense({units: 64, activation: 'relu'}));
  model.add(tf.layers.dense({units: 32, activation: 'relu'}));
  model.add(tf.layers.dense({units: 16, activation: 'relu'}));
  model.add(tf.layers.dense({units: 8, activation: 'relu'}));
  model.add(tf.layers.dense({units: 4, activation: 'relu'}));
  model.add(tf.layers.dense({units: 2, activation: 'relu'}));
  model.add(tf.layers.dense({units: 1, activation: 'sigmoid'}));

  // Compila el modelo
  model.compile({
    loss: 'binaryCrossentropy',
    optimizer: 'adam',
    metrics: ['accuracy'],
  });

  // Entrena el modelo
  await model.fit(xTrain, yTrain, {
    epochs: 150,
    batchSize: 64,
  });

  // Evalúa el modelo
  const scores = model.evaluate(xTest, yTest);
  console.log(`Test loss: ${scores[0].data}`);
  // Define las características de la nueva skin que quieres generar
  const xNew = [
    // Color del pelo (0 a 255)
    [0, 0, 0],
    // Color de la piel (0 a 255)
    [0, 0, 0],
    // Color de la camisa (0 a 255)
    [0, 0, 0],
    // Color de los pantalones (0 a 255)
    [0, 0, 0],
  ];

  // Usa el modelo para hacer una nueva skin de Minecraft
  const newSkin = model.predict(xNew);

  // Muestra la nueva skin generada
  console.log(newSkin);

  // Guarda la nueva skin en un archivo
  await saveSkin(newSkin, 'new_skin.png');

  // Carga la nueva skin en Minecraft
  await setSkin('new_skin.png');
}

run();
