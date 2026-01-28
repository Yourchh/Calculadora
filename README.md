# Calculadora 🧮

Aplicación de calculadora multiplataforma desarrollada con React Native y Expo. Incluye funcionalidades básicas y científicas con interfaz moderna y soporte para modo oscuro.

## 📋 Características

- ✨ **Calculadora Básica**: Operaciones aritméticas fundamentales (suma, resta, multiplicación, división)
- 🔬 **Calculadora Científica**: Funciones avanzadas (trigonométricas, logaritmos, exponenciales, factorial)
- 📱 **Multiplataforma**: Funciona en iOS, Android y Web
- 🌓 **Modo Oscuro**: Tema claro y oscuro automático
- 📊 **Historial**: Panel de historial de operaciones realizadas
- ♿ **Accesible**: Interfaz intuitiva y fácil de usar
- 🎨 **Diseño Moderno**: UI pulida con navegación por pestañas

## 🛠️ Tecnologías

- **React Native** 0.81.5
- **Expo** ~54.0
- **TypeScript** ~5.9.2
- **Expo Router** ~6.0.22 (navegación basada en archivos)
- **React Navigation** (navegación por pestañas)
- **Expo Haptics** (retroalimentación táctil)

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior) - [Descargar aquí](https://nodejs.org/)
- **npm** o **yarn** (viene con Node.js)
- **Expo Go** en tu dispositivo móvil (opcional, para pruebas en dispositivo físico)
  - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
  - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Para desarrollo nativo (opcional):

- **Xcode** (para iOS, solo en macOS)
- **Android Studio** (para Android)

## 🚀 Instalación

### 1. Clonar o descargar el proyecto

```bash
# Si tienes el repositorio en Git
git clone <url-del-repositorio>
cd calculadora

# O simplemente navega a la carpeta del proyecto si ya lo descargaste
cd /ruta/a/calculadora
```

### 2. Instalar dependencias

```bash
npm install
```

Este comando instalará todas las dependencias necesarias listadas en el archivo `package.json`.

## ▶️ Ejecutar la Aplicación

### Iniciar el servidor de desarrollo

```bash
npm start
# o alternativamente
npx expo start
```

Esto iniciará Metro Bundler y mostrará un código QR en la terminal.

### Opciones de ejecución:

#### 📱 En dispositivo físico (método recomendado para comenzar)

1. Instala **Expo Go** en tu dispositivo móvil
2. Escanea el código QR que aparece en la terminal:
   - **iOS**: Usa la cámara nativa del iPhone
   - **Android**: Usa la app Expo Go para escanear

#### 🍎 En simulador de iOS (solo macOS)

```bash
npm run ios
# o
npx expo start --ios
```

Requiere tener Xcode instalado.

#### 🤖 En emulador de Android

```bash
npm run android
# o
npx expo start --android
```

Requiere tener Android Studio y un emulador Android configurado.

#### 🌐 En navegador web

```bash
npm run web
# o
npx expo start --web
```

La aplicación se abrirá automáticamente en tu navegador predeterminado.

## 📖 Guía de Uso

### Navegación

La aplicación cuenta con dos pestañas principales:

1. **Calculadora** (pestaña principal): Interfaz de la calculadora
2. **Explorar**: Información adicional y recursos

### 🌓 Cambiar entre Modo Claro y Oscuro

La aplicación **sigue automáticamente** el tema de tu dispositivo (claro u oscuro). Para cambiar el modo:

#### En iOS:
1. Abre **Ajustes** → **Pantalla y brillo**
2. Selecciona:
   - **Claro** para modo claro
   - **Oscuro** para modo oscuro
   - **Automático** para que cambie según la hora del día

#### En Android:
1. Abre **Configuración** → **Pantalla**
2. Busca **Tema oscuro** o **Modo oscuro**
3. Activa o desactiva el interruptor

#### En navegador web:
- El modo se adapta automáticamente a la preferencia de tu sistema operativo
- En macOS: **Preferencias del Sistema** → **General** → **Apariencia**
- En Windows: **Configuración** → **Personalización** → **Colores** → **Elige tu color**

La app detectará el cambio inmediatamente y actualizará su apariencia.

### Modo Calculadora

#### 🔄 Cambiar entre modo Básico y Científico

- En la parte superior de la calculadora encontrarás un **interruptor/switch**
- **Apagado** (izquierda): Modo Básico
- **Encendido** (derecha): Modo Científico

### Calculadora Básica

**Operaciones disponibles:**

- **Números**: 0-9 y punto decimal (.)
- **Operaciones**: `+`, `-`, `×`, `÷`
- **Funciones especiales**:
  - `AC`: Borra toda la pantalla
  - `⌫`: Borra el último dígito
  - `±`: Cambia el signo del número
  - `%`: Calcula el porcentaje
  - `=`: Calcula el resultado

**Ejemplo de uso:**

```
Operación: 25 + 75 =
1. Toca "2" → "5"
2. Toca "+"
3. Toca "7" → "5"
4. Toca "=" → Resultado: 100
```

### Calculadora Científica

**Funciones adicionales:**

- **Trigonométricas**:
  - `sin`: Seno
  - `cos`: Coseno
  - `tan`: Tangente
- **Exponenciales y Logaritmos**:
  - `√`: Raíz cuadrada
  - `x²`: Cuadrado
  - `eˣ`: Exponencial
  - `ln`: Logaritmo natural
  - `log`: Logaritmo base 10
- **Otras**:
  - `x!`: Factorial
  - `1/x`: Recíproco

**Ejemplo de uso:**

```
Calcular sen(30):
1. Toca "3" → "0"
2. Toca "sin" → Resultado: 0.5
```

**Nota importante**: Las funciones trigonométricas trabajan en grados.

### Historial de Operaciones

- El panel de historial muestra las últimas operaciones realizadas
- Se actualiza automáticamente después de cada cálculo
- Incluye tanto la operación como el resultado

## 📁 Estructura del Proyecto

```
calculadora/
├── app/                          # Navegación y pantallas (Expo Router)
│   ├── (tabs)/                  # Navegación por pestañas
│   │   ├── index.tsx            # Pantalla principal (calculadora)
│   │   └── explore.tsx          # Pantalla de exploración
│   ├── _layout.tsx              # Layout raíz
│   └── modal.tsx                # Pantalla modal
├── components/                   # Componentes React
│   ├── basic-calculator.tsx     # Componente calculadora básica
│   ├── scientific-calculator.tsx # Componente calculadora científica
│   ├── history-panel.tsx        # Panel de historial
│   └── ui/                      # Componentes UI reutilizables
├── hooks/                        # React Hooks personalizados
│   └── use-calculator.ts        # Lógica de la calculadora
├── constants/                    # Constantes y temas
│   └── theme.ts                 # Definición de colores y temas
├── assets/                       # Recursos estáticos (imágenes, iconos)
├── app.json                      # Configuración de Expo
├── package.json                  # Dependencias del proyecto
└── tsconfig.json                # Configuración de TypeScript
```

## 🎨 Personalización

### Cambiar colores del tema

Edita el archivo [constants/theme.ts](constants/theme.ts) para modificar los colores:

```typescript
export const theme = {
  light: {
    primary: "#007AFF",
    // ... otros colores
  },
  dark: {
    primary: "#0A84FF",
    // ... otros colores
  },
};
```

### Modificar la lógica de cálculo

La lógica principal está en [hooks/use-calculator.ts](hooks/use-calculator.ts). Aquí puedes:

- Agregar nuevas operaciones
- Modificar la precisión de los cálculos
- Cambiar el comportamiento del historial

## 🧪 Scripts Disponibles

```bash
# Iniciar servidor de desarrollo
npm start

# Ejecutar en iOS
npm run ios

# Ejecutar en Android
npm run android

# Ejecutar en web
npm run web

# Ejecutar linter
npm run lint

# Reiniciar proyecto (limpiar código de ejemplo)
npm run reset-project
```

## 🐛 Solución de Problemas

### El código QR no aparece

```bash
# Limpia la caché y reinicia
npx expo start --clear
```

### Error al instalar dependencias

```bash
# Elimina node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
```

### La app no se actualiza en el dispositivo

- Agita el dispositivo para abrir el menú de desarrollo
- Selecciona "Reload" o "Recargar"
- O presiona `r` en la terminal donde corre Expo

### Errores de TypeScript

```bash
# Verifica la configuración de TypeScript
npx tsc --noEmit
```

## 📚 Recursos Adicionales

- [Documentación de Expo](https://docs.expo.dev/)
- [Documentación de React Native](https://reactnative.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [Tutorial de Expo](https://docs.expo.dev/tutorial/introduction/)

## 📄 Licencia

Este proyecto es privado y está destinado para uso educativo.

## 👨‍💻 Desarrollo

Desarrollado como parte del curso PHM - 2026

---

¿Necesitas ayuda? Revisa la [documentación de Expo](https://docs.expo.dev/) o únete a la [comunidad de Discord](https://chat.expo.dev).
