# Chatbot de Propuestas Presidenciales — Colombia 2026

## De qué se trata

Este sistema permite hacerle preguntas en español sobre las propuestas y posiciones de los candidatos a la presidencia de Colombia 2026. Por ejemplo:

- *"¿Qué propone Sergio Fajardo sobre seguridad?"*
- *"¿Qué diferencias hay entre Paloma Valencia y Claudia López en educación?"*
- *"¿Qué piensan los candidatos sobre la corrupción?"*
- *"¿Qué dice Enrique Peñalosa sobre infraestructura?"*

El sistema busca la información más relevante entre todo lo que los candidatos han dicho o publicado, y genera una respuesta en lenguaje natural con referencias a las fuentes originales.

---

## De dónde sale la información

La información proviene de múltiples tipos de fuentes:

### 1. Propuestas publicadas en sitios web y PDFs

Dos candidatos —**Sergio Fajardo** y **Paloma Valencia**— tienen documentos de propuestas publicados en sus páginas de campaña. Estos cubren temas como seguridad, salud, educación, vivienda, energía, anticorrupción y formalización económica.

Para cada candidato se creó un *parser* (programa que extrae texto limpio) adaptado a la estructura de su página web. Los PDFs también se procesaron para extraer el texto y marcar los números de página.

### 2. Entrevistas en video — *Candidatos al Tablero* (Caracol)

El programa [*Candidatos al Tablero*](https://www.youtube.com/playlist?list=PLa28R7QEiMblhzptOO7bOGEAKbCJdJ35x) de Noticias Caracol entrevistó a **23 candidatos**. A partir de estos videos se extrajeron las transcripciones (lo que dijo cada candidato), se limpiaron y se asociaron con marcas de tiempo. Esto permite que al consultar algo dicho en una entrevista, el sistema pueda enlazar directamente al minuto exacto del video en YouTube.

### 3. Artículos y entrevistas de medios de comunicación

Se incorporaron artículos y entrevistas de seis medios colombianos adicionales:

- **El Colombiano** — cubre 14 candidatos
- **Semana** — cubre 15 candidatos
- **Cambio** — cubre 1 candidato
- **Radio Nacional de Colombia** — cubre 1 candidato
- **RTCV Noticias** — cubre 1 candidato
- **Semanario de la Calle** — cubre 1 candidato

Estas fuentes complementan la información de las entrevistas en video con artículos periodísticos, perfiles de candidatos y entrevistas escritas.

### Resumen de cobertura

| Tipo de fuente | Candidatos | Detalle |
|---|---|---|
| Propuestas estructuradas + entrevista + medios | 2 | Sergio Fajardo, Paloma Valencia |
| Entrevista en video + medios | 17 | Enrique Peñalosa, Juan Daniel Oviedo, Roy Barreras, David Luna, Juan Carlos Pinzón, Mauricio Cárdenas, Abelardo de la Espriella, Aníbal Gaviria, Vicky Dávila, Claudia López, Clara López, Camilo Romero, Carlos Felipe Córdoba, Juan Fernando Cristo, Juan Manuel Galán, Luis Carlos Reyes, Mauricio Lizcano |
| Solo entrevista en video | 4 | Daniel Palacios, Leonardo Huerta, Maurice Armitage, Santiago Botero |
| Solo medios (sin entrevista Caracol) | 1 | Iván Cepeda |

En total el sistema tiene **2392 fragmentos de texto** indexados, provenientes de **67 documentos** de **24 candidatos**, a través de **8 tipos de fuente** distintos.

---

## Cómo se procesa la información

### Fragmentación del texto

Cada propuesta, transcripción o artículo se divide en fragmentos pequeños (máximo ~800 caracteres). Esto es necesario porque el sistema de búsqueda funciona mejor con pedazos de texto enfocados en una idea, en vez de documentos completos de varias páginas.

Cada fragmento se guarda junto con información de contexto: de qué candidato es, a qué tema pertenece, de qué documento y fuente viene, y en qué página o minuto del video se encuentra.

### Clasificación por tema

Las propuestas publicadas ya vienen organizadas por tema. Para las entrevistas y artículos, donde se habla de muchos temas en un solo documento, el sistema clasifica automáticamente cada fragmento según su contenido usando similaridad semántica. El sistema maneja **16 categorías temáticas**, todas en español:

| Tema | Ejemplos de contenido |
|---|---|
| Seguridad | Policía, crimen, defensa, fuerza pública |
| Salud | Hospitales, EPS, medicamentos, cobertura |
| Educación | Colegios, universidades, becas, ICETEX |
| Economía | Empleo, formalización, comercio, crecimiento |
| Infraestructura | Vías, transporte, obras públicas |
| Anticorrupción | Transparencia, contratación, veedurías |
| Vivienda | Subsidios, construcción, arriendo |
| Energía | Renovable, transición, petróleo, minería |
| Infraestructura Rural | Campo, agro, vías terciarias |
| Derechos de la Mujer | Género, violencia, equidad |
| Pensiones | Reforma pensional, Colpensiones, vejez |
| Narcotráfico | Drogas, coca, extradición |
| Paz y Conflicto | Acuerdos de paz, víctimas, reincorporación |
| Impuestos | Reforma tributaria, IVA, evasión |
| Medio Ambiente | Deforestación, cambio climático, biodiversidad |
| General | Fragmentos que no encajan claramente en otra categoría |

### Representación numérica

Cada fragmento se convierte en una representación numérica (un *embedding*) usando un modelo de inteligencia artificial multilingüe (`paraphrase-multilingual-mpnet-base-v2`, 768 dimensiones). Esto permite que la búsqueda no dependa de encontrar las palabras exactas, sino del **significado**. Por ejemplo, una pregunta sobre "empleo" puede encontrar fragmentos que hablen de "trabajo", "formalización laboral" o "desempleo".

---

## Cómo funciona la búsqueda

Cuando alguien hace una pregunta, el sistema sigue estos pasos:

### 1. Entender la pregunta

Primero analiza el texto para detectar automáticamente:
- **Candidatos mencionados**: si la pregunta dice "Fajardo", el sistema sabe que se refiere a Sergio Fajardo. Puede detectar múltiples candidatos en una misma pregunta para comparaciones.
- **Tema**: si la pregunta menciona "policía" o "crimen", detecta que el tema es seguridad.
- **Palabras clave**: expande sinónimos relevantes. Por ejemplo, si se pregunta por "empleo", también busca "trabajo", "laboral", "empresa".

### 2. Buscar en la base de datos

La búsqueda combina tres capas:
1. **Filtrado exacto**: usa los candidatos y temas detectados para reducir el espacio de búsqueda con filtros de metadatos en la base de datos.
2. **Búsqueda por palabras clave**: prioriza fragmentos que contienen las palabras exactas o sinónimos de la pregunta, expandidos automáticamente.
3. **Búsqueda por significado (semántica)**: encuentra los fragmentos cuyo significado es más parecido al de la pregunta, incluso si no comparten las mismas palabras.

Los resultados de las tres capas se combinan con una puntuación mixta que prioriza los fragmentos relevantes tanto por significado como por vocabulario. Si la búsqueda filtrada no encuentra suficientes resultados, el sistema recurre automáticamente a la búsqueda semántica pura como respaldo.

### 3. Balanceo en comparaciones

Cuando se comparan dos o más candidatos (por ejemplo, *"diferencias entre Fajardo y Abelardo sobre seguridad"*), el sistema se asegura de traer resultados de **todos** los candidatos mencionados en proporción equilibrada. Sin este paso, un candidato con más documentos publicados podría dominar todos los resultados.

### 4. Expansión de contexto

Opcionalmente, el sistema puede incluir los fragmentos adyacentes (lo que viene justo antes y después del fragmento encontrado) para dar una visión más completa de la idea.

### 5. Optimización de seguimiento

En conversaciones de varias preguntas, el sistema detecta si una pregunta de seguimiento se refiere al mismo candidato y tema que la anterior. En ese caso, reutiliza los fragmentos ya encontrados sin hacer una nueva búsqueda, lo que hace la conversación más rápida y fluida. Si el usuario cambia de candidato o de tema, el sistema hace una búsqueda nueva automáticamente.

---

## La respuesta conversacional

Los fragmentos encontrados se pasan a un modelo de lenguaje (LLM) que genera una respuesta en español. El sistema soporta dos opciones de modelo:

- **Ollama** (local) — usa `llama3.2` sin necesidad de internet ni API keys
- **OpenAI** (nube) — usa `gpt-4o-mini` para mayor calidad de respuesta

El modelo tiene instrucciones claras:

- **Responder solo con lo que dicen las fuentes** — no inventa información.
- **Citar siempre la fuente** — cada afirmación lleva una referencia `[1]`, `[2]`, etc. que corresponde al fragmento de donde salió.
- **Organizar comparaciones por candidato** — cuando se piden diferencias, la respuesta se estructura candidato por candidato.
- **Ser honesto con la falta de información** — si no hay datos suficientes sobre un candidato para la pregunta hecha, lo dice explícitamente.
- **Orientar preguntas vagas** — si la pregunta es muy general, sugiere temas o candidatos específicos para explorar.

Debajo de la respuesta se muestran las fuentes originales con enlaces directos: a la página web de la propuesta, al PDF (con número de página), o al video de YouTube (con marca de tiempo exacta).

---

## La interfaz web

El sistema tiene una interfaz web (Streamlit) donde cualquier persona puede:

- Escribir una pregunta en lenguaje natural
- Filtrar por candidato o por tema específico
- Ver los resultados como lista detallada o en vista comparativa (lado a lado)
- Activar o desactivar la respuesta conversacional del LLM
- Mantener una conversación con preguntas de seguimiento
- Hacer clic en los enlaces para ir directamente a la fuente original

El sistema también está desplegado públicamente en **HuggingFace Spaces**, donde cualquier persona puede usarlo sin instalación. Esta versión reconstruye la base de datos automáticamente al iniciar y usa OpenAI como modelo de lenguaje.

---

## Rendimiento

- **Construcción de la base de datos**: 1–2 minutos (primera vez)
- **Tiempo de consulta**: 100–200 ms (básica), 150–300 ms (con expansión de contexto)
- **Primera carga del modelo de embeddings**: ~30–60 segundos (descarga ~420 MB, se cachea después)
- **Uso de memoria**: ~600–700 MB con el modelo cargado

---

## Pruebas y métricas de calidad

El sistema cuenta con una suite de pruebas automatizadas y un conjunto de métricas para medir la calidad de la búsqueda.

### Suite de pruebas

Se tienen **45 pruebas** organizadas en 4 archivos:

| Archivo | Pruebas | Qué verifica |
|---|---|---|
| `test_query_core.py` | 18 | Construcción de filtros, mezcla de resultados, preprocesamiento de consultas |
| `test_chat.py` | 16 | Construcción de prompts, extracción de fuentes, selección de backend LLM |
| `test_retrieval.py` | 6 | Resolución de nombres de candidatos, consultas por tema, comparaciones multi-candidato |
| `test_semantic_quality.py` | 5 | Métricas de calidad semántica (ver sección siguiente) |

### Métricas de calidad de búsqueda

Se miden cinco dimensiones de calidad de forma automatizada:

**1. Robustez ante paráfrasis** — ¿La búsqueda encuentra los mismos resultados si la pregunta se formula de otra manera?
- Se comparan 14 pares de consultas (formal vs. coloquial), por ejemplo: *"reforma al sistema de salud"* vs. *"cómo van a arreglar la salud"*
- **Overlap@5 = 0.41** (pipeline completo), **0.47** (solo semántica) — significa que ~4 de cada 10 resultados se mantienen sin importar cómo se formule la pregunta

**2. Calidad del ranking** — ¿Los resultados más relevantes aparecen primero?
- **MRR = 1.0** — el primer resultado siempre es del tema correcto
- **Precision@3 = 0.83** — 5 de cada 6 resultados en el top 3 son del tema correcto
- **Precision@5 = 0.83** — se mantiene la precisión incluso al expandir a 5 resultados

**3. Cobertura de candidatos** — ¿La búsqueda por tema trae resultados de múltiples candidatos?
- **Promedio de candidatos únicos por consulta: 5.6** — para una consulta genérica como "seguridad ciudadana", el sistema encuentra fragmentos de ~6 candidatos diferentes
- Esto es importante para que el sistema no se sesgue hacia los candidatos con más documentos

**4. Comprensión de matices del español** — ¿El sistema entiende expresiones coloquiales?
- **Overlap@5 = 0.18** — las expresiones muy coloquiales (*"los políticos se roban la plata"*) tienen menos coincidencia con sus versiones formales (*"corrupción estatal"*), lo cual es esperable dado que usan vocabulario muy diferente

**5. Capa de palabras clave** — ¿El filtro por palabras clave y sinónimos está alineado con la búsqueda semántica?
- **Jaccard = 0.97** — el 97% de los resultados son iguales con y sin filtro de palabras clave, lo que indica que ambas capas refuerzan los mismos documentos en lugar de contradecirse

### Selección del modelo de embeddings

Se compararon tres modelos de embeddings multilingües para determinar cuál funciona mejor con textos políticos en español:

| Modelo | Paráfrasis | MRR | P@3 | P@5 | Cobertura | Jaccard |
|---|---|---|---|---|---|---|
| **mpnet** (el elegido) | **0.47** | **1.0** | **1.0** | **0.83** | **5.3** | **0.93** |
| e5-large | 0.29 | 1.0 | 0.67 | 0.67 | 4.4 | 0.74 |
| bge-m3 | 0.24 | 1.0 | 1.0 | 0.67 | 5.1 | 0.79 |

El modelo `paraphrase-multilingual-mpnet-base-v2` superó a los otros en todas las métricas relevantes, particularmente en robustez ante paráfrasis y cobertura de candidatos.

---

## Limitaciones actuales

- **Cobertura desigual**: solo 2 de los 24 candidatos tienen propuestas estructuradas publicadas. Los demás se cubren a través de entrevistas y artículos de medios. 
- **Calidad de transcripciones**: las transcripciones automáticas de video pueden tener errores, especialmente con nombres propios o términos técnicos.
- **Información en constante cambio**: las propuestas de los candidatos pueden cambiar. El sistema refleja lo publicado al momento de la última actualización de datos.
- **Cobertura de medios variable**: la cantidad de artículos por candidato varía según la disponibilidad de fuentes. Algunos candidatos tienen cobertura de 3–4 medios, otros de solo uno.
