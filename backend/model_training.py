# import tensorflow as tf
# from tensorflow.keras.preprocessing.image import ImageDataGenerator
# from tensorflow.keras.models import Sequential
# from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout, BatchNormalization
# from tensorflow.keras.optimizers import Adam
# from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau
# import os

# # ✅ Enable GPU if available
# gpus = tf.config.experimental.list_physical_devices('GPU')
# if gpus:
#     try:
#         tf.config.experimental.set_memory_growth(gpus[0], True)
#         tf.config.set_visible_devices(gpus[0], 'GPU')
#         print("GPU is now being used.")
#     except RuntimeError as e:
#         print(e)

# print("Num GPUs Available:", len(tf.config.list_physical_devices('GPU')))

# #✅ Data directories
# train_dir = "./dataset/fer-2013/train"
# val_dir = "./dataset/fer-2013/test"

# # ✅ Image parameters
# IMG_SIZE = 48
# BATCH_SIZE = 64  # Optimal for GPU training

# # ✅ Data Augmentation to reduce overfitting
# train_datagen = ImageDataGenerator(
#     rescale=1.0/255,
#     rotation_range=15,
#     width_shift_range=0.2,
#     height_shift_range=0.2,
#     shear_range=0.2,
#     zoom_range=0.2,
#     horizontal_flip=True
# )

# val_datagen = ImageDataGenerator(rescale=1.0/255)  # No augmentation for validation

# train_generator = train_datagen.flow_from_directory(
#     train_dir,
#     target_size=(IMG_SIZE, IMG_SIZE),
#     batch_size=BATCH_SIZE,
#     color_mode="grayscale",
#     class_mode="categorical"
# )

# val_generator = val_datagen.flow_from_directory(
#     val_dir,
#     target_size=(IMG_SIZE, IMG_SIZE),
#     batch_size=BATCH_SIZE,
#     color_mode="grayscale",
#     class_mode="categorical"
# )

# # ✅ CNN Model
# model = Sequential([
#     # Convolutional Layers
#     Conv2D(64, (3,3), activation="relu", input_shape=(IMG_SIZE, IMG_SIZE, 1)),
#     BatchNormalization(),
#     MaxPooling2D(2,2),
    
#     Conv2D(128, (3,3), activation="relu"),
#     BatchNormalization(),
#     MaxPooling2D(2,2),
    
#     Conv2D(256, (3,3), activation="relu"),
#     BatchNormalization(),
#     MaxPooling2D(2,2),

#     # Flatten and Fully Connected Layers
#     Flatten(),
#     Dense(512, activation="relu"),
#     Dropout(0.5),
#     Dense(256, activation="relu"),
#     Dropout(0.5),
#     Dense(7, activation="softmax")  # 7 classes for emotions
# ])

# # ✅ Compile the model with Adam optimizer
# model.compile(
#     loss="categorical_crossentropy",
#     optimizer=Adam(learning_rate=0.001),
#     metrics=["accuracy"]
# )

# # ✅ Callbacks for optimal training
# early_stopping = EarlyStopping(monitor="val_loss", patience=5, restore_best_weights=True)
# reduce_lr = ReduceLROnPlateau(monitor="val_loss", factor=0.2, patience=3, min_lr=1e-5)

# # ✅ Train the model
# history = model.fit(
#     train_generator,
#     validation_data=val_generator,
#     epochs=50,  # Increase if accuracy is below 80%
#     batch_size=BATCH_SIZE,
#     callbacks=[early_stopping, reduce_lr]
# )

# # ✅ Save the model
# model.save("emotion_detection_cnn_model_2.h5")

# # ✅ Print model summary
# model.summary()


import tensorflow as tf
import matplotlib.pyplot as plt
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout, BatchNormalization
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau
import os

# ✅ Enable GPU if available
gpus = tf.config.experimental.list_physical_devices('GPU')
if gpus:
    try:
        tf.config.experimental.set_memory_growth(gpus[0], True)
        tf.config.set_visible_devices(gpus[0], 'GPU')
        print("✅ GPU is now being used.")
    except RuntimeError as e:
        print(e)

print("🖥️ Num GPUs Available:", len(tf.config.list_physical_devices('GPU')))

train_dir = "./dataset/fer-2013/train"
val_dir = "./dataset/fer-2013/test"

IMG_SIZE = 48
BATCH_SIZE = 64

train_datagen = ImageDataGenerator(
    rescale=1.0/255,
    rotation_range=20,
    width_shift_range=0.3,
    height_shift_range=0.3,
    shear_range=0.3,
    zoom_range=0.3,
    horizontal_flip=True
)

val_datagen = ImageDataGenerator(rescale=1.0/255)

train_generator = train_datagen.flow_from_directory(
    train_dir, target_size=(IMG_SIZE, IMG_SIZE), batch_size=BATCH_SIZE, color_mode="grayscale", class_mode="categorical"
)

val_generator = val_datagen.flow_from_directory(
    val_dir, target_size=(IMG_SIZE, IMG_SIZE), batch_size=BATCH_SIZE, color_mode="grayscale", class_mode="categorical"
)

model_path = "./emotion_detection_cnn_model_2.h5"
if os.path.exists(model_path):
    print("Resuming training from saved model...")
    model = load_model(model_path)
    new_epochs = 70
    learning_rate = 0.0001
else:
    print("🚀 Training from scratch...")
    model = Sequential([
        Conv2D(64, (3,3), activation="relu", input_shape=(IMG_SIZE, IMG_SIZE, 1)),
        BatchNormalization(),
        MaxPooling2D(2,2),

        Conv2D(128, (3,3), activation="relu"),
        BatchNormalization(),
        MaxPooling2D(2,2),

        Conv2D(256, (3,3), activation="relu"),
        BatchNormalization(),
        MaxPooling2D(2,2),

        Flatten(),
        Dense(512, activation="relu"),
        Dropout(0.5),
        Dense(256, activation="relu"),
        Dropout(0.5),
        Dense(7, activation="softmax")  # 7 emotions
    ])
    new_epochs = 50
    learning_rate = 0.001

model.compile(loss="categorical_crossentropy", optimizer=Adam(learning_rate=learning_rate), metrics=["accuracy"])

early_stopping = EarlyStopping(monitor="val_loss", patience=5, restore_best_weights=True)
reduce_lr = ReduceLROnPlateau(monitor="val_loss", factor=0.2, patience=3, min_lr=1e-5)

history = model.fit(
    train_generator,
    validation_data=val_generator,
    epochs=new_epochs,
    batch_size=BATCH_SIZE,
    callbacks=[early_stopping, reduce_lr]
)

model.save("emotion_detection_cnn_model_3.h5")

train_acc = history.history['accuracy'][-1] * 100
val_acc = history.history['val_accuracy'][-1] * 100
print(f"\n🎯 Final Training Accuracy: {train_acc:.2f}%")
print(f"🎯 Final Validation Accuracy: {val_acc:.2f}%")

plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plt.plot(history.history['accuracy'], label="Train Accuracy", color="blue")
plt.plot(history.history['val_accuracy'], label="Validation Accuracy", color="red")
plt.title("📈 Accuracy Over Epochs")
plt.xlabel("Epochs")
plt.ylabel("Accuracy")
plt.legend()

plt.subplot(1, 2, 2)
plt.plot(history.history['loss'], label="Train Loss", color="blue")
plt.plot(history.history['val_loss'], label="Validation Loss", color="red")
plt.title("📉 Loss Over Epochs")
plt.xlabel("Epochs")
plt.ylabel("Loss")
plt.legend()

plt.show()
