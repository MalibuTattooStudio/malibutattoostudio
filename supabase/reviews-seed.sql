-- ============================================================================
--  Malibu Tattoo Studio — reseñas reales, transcritas de capturas de Google
--  (33 Santa Cruz + 32 Tabaiba). Correr una vez, después de reviews.sql.
--  Texto recortado a la última frase completa capturada — nada inventado.
--  Seguro de re-ejecutar (de-dupe por source_id).
-- ============================================================================

alter table public.reviews add column if not exists source_id text;

-- (si ya tienes una versión parcial de este índice de un intento anterior,
--  la sustituye por una completa — ON CONFLICT no puede usar un índice parcial
--  sin repetir su condición, así que la quitamos de raíz)
drop index if exists public.reviews_source_id_key;
create unique index reviews_source_id_key on public.reviews (source_id);
-- nulos múltiples siguen permitidos (Postgres no considera NULL = NULL);
-- solo se bloquean los source_id repetidos, que es lo que queremos.

-- ─────────────────────────────────────────────────────────────────────────────
-- Santa Cruz — 33 reseñas, 15 marcadas on_landing
-- ─────────────────────────────────────────────────────────────────────────────
insert into public.reviews (source_id, studio, author_name, rating, body, review_date, lang, on_landing) values
('sc-01','santacruz','urko sola',5,'Excelente experiencia y calidad impecable.','2026-07-04','es',true),
('sc-02','santacruz','Yusmeiry Betsire Chavarri Chavarri',5,'Gabriel, de verdad quería decirte que ha merecido totalmente la pena venir desde Málaga hasta Tenerife solo para tatuarme contigo. Tu trabajo es increíble.','2026-04-04','es',true),
('sc-03','santacruz','Vanesa Brito Gabino',5,'Arte puro y total confianza! Erios es un artista increíble.','2026-07-04','es',true),
('sc-04','santacruz','Hadamer Ramos',5,'Hay personas que no solo hacen tatuajes; convierten recuerdos, amor y sentimientos en arte para toda la vida. Y tú, Erios, eres una de ellas.','2026-08-04','es',true),
('sc-05','santacruz','nayra martin bello',5,'Hoy me hice mi segundo tatuaje con Erios y, una vez más, la experiencia ha sido impecable. Para mí es el mejor tatuador.','2026-07-04','es',false),
('sc-06','santacruz','Diana',5,'Elegir a Iker fue un auténtico acierto desde el primer instante. Demuestra una destreza admirable en cada piercing que realiza.','2026-08-04','es',false),
('sc-07','santacruz','Ainoa Ravelo Delgado',5,'No puedo estar más contenta con este estudio, el trato y el resultado. Todo el estudio es muy acogedor; me sentí súper cómoda nada más entrar.','2026-05-04','es',true),
('sc-08','santacruz','manuel tixier',5,'Me hice un tatuaje con Gabriel y solo puedo recomendarlo. Más allá de ser una persona increíble, es un tatuador muy atento.','2026-05-04','es',false),
('sc-09','santacruz','HERMINIA Tejera',5,'Después de varias sesiones puedo decir que Erios tattoo combina creatividad, técnica y una gran profesionalidad en cada trabajo.','2026-07-04','es',true),
('sc-10','santacruz','Dafne Pallés',5,'Increíble experiencia en este estudio. El ambiente es muy profesional y acogedor, y todo está impecable.','2026-07-04','es',false),
('sc-11','santacruz','vicky felipe',5,'Encantadísima con mi experiencia en este estudio. El espacio es súper bonito y muy acogedor, te hace sentir cómoda desde el primer momento.','2026-02-04','es',true),
('sc-12','santacruz','Naidira',5,'Fui con una idea algo vaga, la verdad pero Kris me ayudó muchísimo. Convirtió un concepto que no tenía mucha forma en algo con personalidad.','2026-07-04','es',false),
('sc-13','santacruz','Sabine Poidinger',5,'Excelente lugar, muy acogedor e higiénico, yo e tenido la oportunidad de hacerme este tatuaje con Erios y la verdad que es un excelente artista.','2026-07-04','es',true),
('sc-14','santacruz','YASMINA HERNANDEZ BERNAL',5,'Erios Rodríguez me ha hecho varios tatuajes, siempre muy profesional. Sabe muy bien lo que hace por sus muchos años de experiencia.','2026-07-04','es',false),
('sc-15','santacruz','Idaira Alvarez',5,'Una experiencia genial de principio a fin. Gabriel es un gran profesional, atento y muy detallista.','2026-05-04','es',false),
('sc-16','santacruz','Maria Barrio',5,'Hace 4 dias me hice mi primer tatu con Cris y estoy super feliz y contenta. Trato excelente y trabajo excelentísimo, sin duda repetiré.','2026-07-04','es',false),
('sc-17','santacruz','Oscar Tormo',5,'Llamé por teléfono para preguntar sobre unos piercings que quería hacerme, justamente me respondió Iker, el piercer y me esclareció todas las dudas.','2026-04-04','es',false),
('sc-18','santacruz','levi martin hernandez',5,'Altamente recomendable..... mi experiencia a sido de 10 con el señor Erios.','2026-08-04','es',false),
('sc-19','santacruz','yasmina de la paz',5,'Super contenta con mi elección de estudio el cual es increíble e higiénico.','2026-08-04','es',false),
('sc-20','santacruz','Z3b3n Blanquiazul',5,'Me e tatuado con erios el brazo y super contento con el trabajo que realiza.','2026-07-04','es',false),
('sc-21','santacruz','Itahisa Rodríguez',5,'Me hice dos perforaciones con Pidol y fue todo genial. Súper simpático y profesional, te explica todo el proceso y hace que te sientas muy tranquila y segura, y el resultado perfecto. Definitivamente volveré!!!','2026-04-04','es',true),
('sc-22','santacruz','Actanistaya Llarena García',5,'Siempre me tatuo con Erios una experiencia de 10! Muy profesional, atento al detalle y con un resultado increíble. Buen trato y excelente en todo momento. Totalmente recomendado!','2026-08-04','es',true),
('sc-23','santacruz','Zenaida Diaz',5,'Pues yo diré que erios es uno de los mejores tatuando, tengo dos de sus trabajos y increíbles, la verdad que también calidad precio vale mucho la pena tatuarse con el, osea que lo recomiendo 100%, un saludo.','2026-08-04','es',true),
('sc-24','santacruz','Santiago Salas',5,'Me hice este tatuaje la semana pasada para el San Juan y super el resultado final, Gabriel un verdadero profesional el tattoo esta curando super bien y rapido. Agradecido y super recomendado.','2026-07-04','es',true),
('sc-25','santacruz','AAAcristina',5,'Pedí una restauración de un tatuaje, y a mano alzada sin plantilla consiguió los resultados que esperaba. Muchas gracias Erio por tu trabajo! Me encantó.','2026-07-04','es',false),
('sc-26','santacruz','Marcos Adex García Pérez',5,'Muy profesionales, el estudio increíble, se está muy a gusto. Me tató Miguel y superó mis expectativas. Repetiré seguro.','2026-06-04','es',false),
('sc-27','santacruz','Natalia ruiz sarmiento',5,'Muy feliz con mi nuevo tatuaje. Gracias a la dedicación de Erios.','2026-08-04','es',false),
('sc-28','santacruz','Daphne Telgenkamp',5,'I had another tattoo appointment with Erio yesterday and today, and wow, he nailed it again!!! Can''t wait for my next.','2026-07-04','en',true),
('sc-29','santacruz','jose ignacio gutierrez san martin',5,'Hola soy Sandra ayer me hice un tatoo con cristina y piercing con iker todo genial, atención higiene y servicio de 10.','2026-04-04','es',false),
('sc-30','santacruz','Carlos José Guaimara Guaimara',5,'Muy satisfecho con el trabajo realizado por Erios, todo un artista profesional.','2026-08-04','es',false),
('sc-31','santacruz','Arian Abel Iglesias Bayoll',5,'Recomiendo el estudio al 100% y especialmente al artista Erios, estoy super satisfecho con el tatuaje que el me ha hecho y la atencion que el me ha dado, 100% profecional.','2026-07-04','es',true),
('sc-32','santacruz','Maria Perez Cubells',5,'Fui a hacerme el piercing del ombligo y la experiencia diez de diez, el chico me tranquilizó mucho porque estaba nerviosa.','2026-02-04','es',false),
('sc-33','santacruz','Eva Expósito',5,'Muchas gracias a Erios, el tatuaje impresionante muy profesional y 100% lo recomiendo sin duda.','2026-08-04','es',true)
on conflict (source_id) do nothing;

-- ─────────────────────────────────────────────────────────────────────────────
-- Tabaiba — 32 reseñas, 15 marcadas on_landing
-- ─────────────────────────────────────────────────────────────────────────────
insert into public.reviews (source_id, studio, author_name, rating, body, review_date, lang, on_landing) values
('tb-01','tabaiba','Diego Tadeo',5,'Quiero agradecer a Yenko por el increíble trabajo que hizo.','2026-07-04','es',false),
('tb-02','tabaiba','Elian Martin',5,'Llevaba tiempo dándole vueltas a hacerme un tatuaje y la verdad es que no sabía muy bien por dónde empezar.','2026-06-04','es',false),
('tb-03','tabaiba','Dani Brito',5,'Cuando un negocio no escatima en el diseño de su local, la apariencia, la modernidad, un estilo propio…','2026-06-04','es',false),
('tb-04','tabaiba','Jonay Tapia Diaz',5,'Nunca en mi vida me había hecho algún tatuaje, y me hice uno gigante con Yenko en el studio Malibu Tattoo.','2026-03-04','es',true),
('tb-05','tabaiba','Sate',5,'Ha sido la primera vez q voy a este estudio y el trato fue de lo mejor. Me tatué con Yaxtattoo y en todo momento estaba atento a mi estado. El resultado increíble, mi tatuaje favorito, con acabados y detalles increíbles. Super recomendado.','2026-06-04','es',true),
('tb-06','tabaiba','Hannah Hernández Hess',5,'Contentísima con todo. Me tatué con Yaxtattoo y fue una experiencia maravillosa como siempre.','2026-07-04','es',true),
('tb-07','tabaiba','Carmen Medina',5,'Recomiendo al 100%. Profesionalidad, asesoramiento y cercanía. Ha sido una experiencia maravillosa. Lo han hecho todo tan sencillo y justo como yo quería.','2026-03-04','es',false),
('tb-08','tabaiba','Andreea Andrei',5,'Great experience with Ari - she''s been super friendly and easy to approach. We agreed on the tattoo idea.','2026-04-04','en',true),
('tb-09','tabaiba','Ulises Rodia Mejias del Castillo',5,'Encantado con el resultado de mis tatuajes. Verdaderos profesionales, con un trato exquisito y una calidad técnica maravillosa.','2026-08-04','es',false),
('tb-10','tabaiba','Miguel Angel Villar Gutiérrez',5,'Súper contento con el resultado. Iria es una auténtica crack y una gran profesional.','2026-06-04','es',true),
('tb-11','tabaiba','Javier Rodriguez Santaella',5,'¡Un 10 en todo! El estudio tiene un estilazo tremendo y está muy bien ubicado.','2026-07-04','es',true),
('tb-12','tabaiba','Abraham Perera González',5,'Después de varias sesiones aquí puedo decir sin duda que son auténticos profesionales.','2026-06-04','es',false),
('tb-13','tabaiba','kimii',5,'I felt very comfortable in this studio. Iria, my tattoo artist, was super nice and catered to all my wishes. The atmosphere was pleasant.','2026-03-04','en',false),
('tb-14','tabaiba','Ángel Delgado González',5,'Fui por primera vez a este estudio y la experiencia ha sido buenísima. Me ha tatuado Iria y el resultado ha sido inmejorable.','2026-04-04','es',false),
('tb-15','tabaiba','Carol IB',5,'Estoy súper contenta con la experiencia en el estudio! Iria hizo un trabajo estupendo con mi tatuaje, me asistió en el diseño y me asesoró en todo momento del proceso. Recomendable al 100%.','2026-06-04','es',false),
('tb-16','tabaiba','Fernando Solano Concepción',5,'Me encantó el diseño y la verdad que fue súper rápido y cómodo. Nada más llegar te hacen sentir bien, explicándolo todo con calma.','2026-06-04','es',false),
('tb-17','tabaiba','Iván Hernández González',5,'Grandísimo estudio muy acogedor con aún más grandes artistas! Ya llevo dos tatuajes con Yenko y sin duda volveré, artista muy, muy, pero muy top y gran persona, puro flow que tiene!!!','2026-06-04','es',true),
('tb-18','tabaiba','Veronica Corujo',5,'Excelente lugar e increíble trabajo realizado por Yab, fue quien me tatuo, estoy totalmente enamorada del resultado de sus tatuajes. Recomiendo el sitio y sobre todo el tatuador.','2026-07-04','es',true),
('tb-19','tabaiba','Marina martin garcia',5,'Muy contenta con el trato y la profesionalidad de Ari! Además de la tranquilidad que se siente en el estudio tan cerquita del mar! Una maravilla tatuarse allí.','2026-03-04','es',true),
('tb-20','tabaiba','Tinixara PB',5,'Me tatué con Yenko, ha sido increíble, tanto el trato como el resultado, cuidando hasta el último detalle, el ambiente es maravilloso, y el local está genial.','2026-03-04','es',false),
('tb-21','tabaiba','Adrian Alvarez Hernandez',5,'La verdad que lo recomiendo 100x100, el estudio siempre cuenta con grandes profesionales en todos los ámbitos que existen en tatuajes.','2026-03-04','es',false),
('tb-22','tabaiba','Jesus Ruiz',5,'Grandes profesionales y un trato inmejorable, los recomendaré siempre, me hice la espalda completa con Yenko y en cada sesión salía más contento de lo que ya estaba.','2026-08-04','es',true),
('tb-23','tabaiba','Rosandrys Cabrera',5,'Recomendadísimo estudio de tatuajes. Kike y Ari son unos auténticos profesionales, atentos, cercanos y con un talento brutal. Los mejores sin duda. Gracias por todo.','2026-06-04','es',true),
('tb-24','tabaiba','Edhey Lopez',5,'Yenko y su estudio completo, unas bestias con la tinta, crean un diseño único, muy buena experiencia y recomendable todo el personal un 10. Sin duda todo tatuaje me lo realizaré con ellos, un saludo.','2026-03-04','es',true),
('tb-25','tabaiba','Marcos Ulises Díaz García',5,'El trabajo muy profesional, me tatué con Yaxtattoo, tiene una muñeca de oro y un chico del 10, súper educado y limpio con el trabajo que hace, se los recomiendo.','2026-06-04','es',false),
('tb-26','tabaiba','Raquel Sanchez',5,'Estudio de tatuajes maravilloso. Buen ambiente, buen servicio y buenos profesionales.','2025-10-04','es',false),
('tb-27','tabaiba','Marcos García Franquis',5,'Yaxtattoo a parte de salir contento con un tattoo que es puro arte ahí, el billar es la hostia, el estudio tiene mucho estilo y son todos muy buena gente.','2026-06-04','es',true),
('tb-28','tabaiba','R. M. A.',5,'Me hice un tatoo con el toque personal de Yenko y no puedo estar más contento. El resultado quedó increíble, con un detalle y una precisión brutales.','2025-10-04','es',false),
('tb-29','tabaiba','Marcos Adex García Pérez',5,'Increíble estudio, muy amplio y se está muy a gusto. Me tatué con Miguel y superó mis expectativas.','2026-06-04','es',false),
('tb-30','tabaiba','Francesca Chiefari',5,'No podría estar más satisfecha y feliz. Iria creó una obra de arte magnífica. Confié en ella sin ningún temor y no me arrepiento. Mil gracias. También me sentí muy a gusto con todo el equipo del estudio.','2025-12-04','es',false),
('tb-31','tabaiba','Javi Rodero',5,'Grandes profesionales, se adaptan a tus gustos y le dan un toque perfecto, el local o estudio una pasada, el trato y ambiente inmejorable, en mi caso trabajó conmigo Ari y he de decir que de 10, ni dolor sentí jajaja.','2025-09-04','es',true),
('tb-32','tabaiba','Mª José Padrón Blanco',5,'Me ha encantado el resultado del tatuaje! Supera mis expectativas, muchas gracias especialmente a Iria, una gran profesional.','2025-11-04','es',false)
on conflict (source_id) do nothing;

-- ─────────────────────────────────────────────────────────────────────────────
-- Medias reales de Google (a fecha 2026-09-04)
-- ─────────────────────────────────────────────────────────────────────────────
update public.studio_stats set google_rating = 4.9, google_count = 286 where studio = 'santacruz';
update public.studio_stats set google_rating = 5.0, google_count = 144 where studio = 'tabaiba';

-- ── comprobación ────────────────────────────────────────────────────────────
--   select studio, count(*), count(*) filter (where on_landing) as en_landing
--   from public.reviews group by studio;
