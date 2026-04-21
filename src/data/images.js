export const HERO = [
  '/images/hero/07dc8522-dc54-4392-9851-5910ed6065c6.avif',
  '/images/hero/445c5fb4-96a8-44ec-b822-d21a243527f8.avif',
  '/images/hero/57b85346-4371-4420-8420-81301fb27fbb.avif',
  '/images/hero/e009b09e-823a-4773-a0f0-5f3a8efff102.avif',
  '/images/hero/e4a211ca-e648-44e9-bae2-08a4743eb7f6.avif',
  '/images/hero/3361922e-5aae-4827-9d22-643e35bd7014.jpeg',
  '/images/hero/garden_2.jpeg',
];

export const GALLERY = [
  '/images/gallery/a97e09ab-338d-4d97-a948-78bfa97ef617.avif',
  '/images/gallery/707db705-0ae6-4a2e-aa11-2e83904d05f8.avif',
  '/images/gallery/5dd4ba69-f9f2-4ab9-9e67-91a598e3b378.avif',
  '/images/gallery/16aa1b03-a435-4da8-a45d-3cb0a1ab818b.jpeg',
];

export const ROOM1 = [
  '/images/room1/287020d3-db2f-4a89-bdd7-030ceb953fdd.jpeg',
  '/images/room1/2d546f07-670b-4dce-a1ce-44263c13216e.jpeg',
  '/images/room1/54ee65a3-3402-4070-87d0-196f8b838fd1.avif',
  '/images/room1/686bc176-f7fa-4e1b-a09c-066bd76ea8e4.jpeg',
  '/images/room1/6c8bf9c8-334b-4132-9940-f14a93ff49c3.avif',
  '/images/room1/aca15e24-cc0e-4298-9703-866e5c03bd66.jpeg',
  '/images/room1/ca20d7cc-5553-4a5c-858c-71791e6e525b.jpeg',
  '/images/room1/ec6d6da2-0896-4976-8997-7f333c5d657d.avif',
  '/images/room1/f74e6913-8a48-40ee-a147-f09fff84275a.avif',
];

export const ROOM2 = [
  '/images/room2/482b53a8-32e1-4edc-ad88-11d636bcc1de.jpeg',
  '/images/room2/829e9532-083f-4825-8022-5a71649c9eca.jpeg',
  '/images/room2/88bd5918-ed7c-4740-b741-c74da8a57d29.jpeg',
  '/images/room2/9cb7f926-48fd-4562-b83e-2c6e646ab017.jpeg',
  '/images/room2/bbf8e98c-51a6-489c-9090-482957ac9724.avif',
  '/images/room2/d9565631-3085-447c-854f-5588e13be35c.avif',
  '/images/room2/f82b90ae-68e5-4a2f-ac8f-c3f5aee33295.avif',
];

export const ROOM3 = [
  '/images/room3/146ce16b-ca46-4ee9-b7d5-d7375a2d4109.jpeg',
  '/images/room3/03d1380b-90dc-48c6-973c-44993ec6cef0.avif',
  '/images/room3/267c6f3d-611b-46c0-ba5d-4f548a213ce1.avif',
  '/images/room3/512da052-fe2d-455e-8a9b-bbbde9fe1784.avif',
  '/images/room3/65bb0515-d8e4-4472-acea-b86839b8fc9d.avif',
  '/images/room3/a596fe66-fe0f-45f0-afa0-cedc517de79a.avif',
  '/images/room3/c5ccb47d-489e-48f1-834d-3601fdd4ab97.jpeg',
  '/images/room3/d53fdb13-62c1-412a-bc3f-708f99958714.jpeg',
  '/images/room3/f1ac52ad-7c42-4cbd-a679-c3e60604b0b7.avif',
];

export const ROOM4 = [
  '/images/room4/yellow_room_1.jpeg',
  '/images/room4/yellow_room_2.avif',
  '/images/room4/70e9418c-0c30-4c01-920d-7b377fbd91ce.avif',
  '/images/room4/85f969b3-5129-4d70-b20a-eba378b012c7.jpeg',
  '/images/room4/92747c82-c3a7-40ba-8872-9d05b34ac257.avif',
  '/images/room4/99c6af8c-cad3-478e-aae7-71dd88e41d24.avif',
  '/images/room4/a73f61ec-554c-4d26-aa35-33fb6f28b975.jpeg',
  '/images/room4/b8334f2c-cc64-4c6c-9e4c-ee6c9eca7937.jpeg',
  '/images/room4/cfc4b204-f0fe-4ab7-9a74-4ba8b1186834.avif',
  '/images/room4/f60e431a-6672-476f-a20e-8db6b0c08585.avif',
];

export const ALL_IMAGES = [...HERO, ...GALLERY, ...ROOM1, ...ROOM2, ...ROOM3, ...ROOM4];

export const OFFSETS = {
  HERO: 0,
  GALLERY: HERO.length,
  ROOM1: HERO.length + GALLERY.length,
  ROOM2: HERO.length + GALLERY.length + ROOM1.length,
  ROOM3: HERO.length + GALLERY.length + ROOM1.length + ROOM2.length,
  ROOM4: HERO.length + GALLERY.length + ROOM1.length + ROOM2.length + ROOM3.length,
};
