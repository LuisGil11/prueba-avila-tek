interface SeedProduct {
  name: string;
  description: string;
  price: number;
  currency: string;
  stock: number;
  unit: string;
}

interface SeedData {
  products: SeedProduct[];
}

export const seedData: SeedData = {
  products: [
    {
      description:
        "Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.",
      stock: 7,
      unit: "units",
      price: 75,
      currency: "USD",
      name: "Men’s Chill Crew Neck Sweatshirt",
    },
    {
      description:
        "The Men's Quilted Shirt Jacket features a uniquely fit, quilted design for warmth and mobility in cold weather seasons. With an overall street-smart aesthetic, the jacket features subtle silicone injected Tesla logos below the back collar and on the right sleeve, as well as custom matte metal zipper pulls. Made from 87% nylon and 13% polyurethane.",
      stock: 5,
      unit: "units",
      price: 200,
      currency: "USD",
      name: "Men's Quilted Shirt Jacket",
    },

    {
      description:
        "Introducing the Tesla Raven Collection. The Men's Raven Lightweight Zip Up Bomber has a premium, modern silhouette made from a sustainable bamboo cotton blend for versatility in any season. The hoodie features subtle thermoplastic polyurethane Tesla logos on the left chest and below the back collar, a concealed chest pocket with custom matte zipper pulls and a french terry interior. Made from 70% bamboo and 30% cotton.",
      stock: 10,
      unit: "units",
      price: 130,
      currency: "USD",
      name: "Men's Raven Lightweight Zip Up Bomber Jacket",
    },

    {
      description:
        "Introducing the Tesla Turbine Collection. Designed for style, comfort and everyday lifestyle, the Men's Turbine Long Sleeve Tee features a subtle, water-based T logo on the left chest and our Tesla wordmark below the back collar. The lightweight material is double-dyed, creating a soft, casual style for ideal wear in any season. Made from 50% cotton and 50% polyester.",
      stock: 50,
      unit: "units",
      price: 45,
      currency: "USD",
      name: "Men's Turbine Long Sleeve Tee",
    },
    {
      description:
        "Introducing the Tesla Turbine Collection. Designed for style, comfort and everyday lifestyle, the Men's Turbine Short Sleeve Tee features a subtle, water-based Tesla wordmark across the chest and our T logo below the back collar. The lightweight material is double-dyed, creating a soft, casual style for ideal wear in any season. Made from 50% cotton and 50% polyester.",
      stock: 50,
      unit: "units",
      price: 40,
      currency: "USD",
      name: "Men's Turbine Short Sleeve Tee",
    },
    {
      description:
        "Designed for comfort, the Cybertruck Owl Tee is made from 100% cotton and features our signature Cybertruck icon on the back.",
      stock: 0,
      unit: "units",
      price: 35,
      currency: "USD",
      name: "Men's Cybertruck Owl Tee",
    },
    {
      description:
        "Inspired by our fully integrated home solar and storage system, the Tesla Solar Roof Tee advocates for clean, sustainable energy wherever you go. Designed for fit, comfort and style, the tee features an aerial view of our seamless Solar Roof design on the front with our signature T logo above 'Solar Roof' on the back. Made from 100% Peruvian cotton.",
      stock: 15,
      unit: "units",
      price: 35,
      currency: "USD",
      name: "Men's Solar Roof Tee",
    },
    {
      description:
        "Inspired by the world’s most unlimited resource, the Let the Sun Shine Tee highlights our fully integrated home solar and storage system. Designed for fit, comfort and style, the tee features a sunset graphic along with our Tesla wordmark on the front and our signature T logo printed above 'Solar Roof' on the back. Made from 100% Peruvian cotton.",
      stock: 17,
      unit: "units",
      price: 35,
      currency: "USD",
      name: "Men's Let the Sun Shine Tee",
    },
    {
      description:
        "Designed for fit, comfort and style, the Men's 3D Large Wordmark Tee is made from 100% Peruvian cotton with a 3D silicone-printed Tesla wordmark printed across the chest.",
      stock: 12,
      unit: "units",
      price: 35,
      currency: "USD",
      name: "Men's 3D Large Wordmark Tee",
    },
    {
      description:
        "Designed for fit, comfort and style, the Tesla T Logo Tee is made from 100% Peruvian cotton and features a silicone-printed T Logo on the left chest.",
      stock: 5,
      unit: "units",
      price: 35,
      currency: "USD",
      name: "Men's 3D T Logo Tee",
    },
    {
      description:
        "Designed for comfort and style in any size, the Tesla Small Wordmark Tee is made from 100% Peruvian cotton and features a 3D silicone-printed wordmark on the left chest.",
      stock: 2,
      unit: "units",
      price: 35,
      currency: "USD",
      name: "Men’s 3D Small Wordmark Tee",
    },
    {
      description:
        "Designed to celebrate Tesla's incredible performance mode, the Plaid Mode Tee features great fit, comfort and style. Made from 100% cotton, it's the next best thing to riding shotgun at the Nürburgring.",
      stock: 82,
      unit: "units",
      price: 35,
      currency: "USD",
      name: "Men's Plaid Mode Tee",
    },
    {
      description:
        "Inspired by our popular home battery, the Tesla Powerwall Tee is made from 100% cotton and features the phrase 'Pure Energy' under our signature logo in the back. Designed for fit, comfort and style, the exclusive tee promotes sustainable energy in any environment.",
      stock: 24,
      unit: "units",
      price: 35,
      currency: "USD",
      name: "Men's Powerwall Tee",
    },
    {
      description:
        "Inspired by Tesla Battery Day and featuring the unveiled tabless battery cell, Battery Day Tee celebrates the future of energy storage and cell manufacturing. Designed for fit, comfort and style, Battery Day Tee is made from 100% cotton with a stylized cell printed across the chest. Made in Peru.",
      stock: 5,
      unit: "units",
      price: 30,
      currency: "USD",
      name: "Men's Battery Day Tee",
    },
    {
      description:
        "Designed for exceptional comfort and inspired by the Cybertruck unveil event, the Cybertruck Bulletproof Tee is made from 100% cotton and features our signature Cybertruck icon on the back.",
      stock: 150,
      unit: "units",
      price: 30,
      currency: "USD",
      name: "Men’s Cybertruck Bulletproof Tee",
    },
    {
      description:
        "Inspired by the Model Y order confirmation graphic, the limited edition Haha Yes Tee is designed for comfort and style. Made from 100% Peruvian cotton and featuring the Tesla wordmark across the chest, the exclusive tee will commemorate your order for years to come.",
      stock: 10,
      unit: "units",
      price: 35,
      currency: "USD",
      name: "Men's Haha Yes Tee",
    },
    {
      description:
        "Designed for fit, comfort and style, the limited edition S3XY Tee is made from 100% cotton with a 3D silicone-printed “S3XY” logo across the chest. Made in Peru. Available in black.",
      stock: 34,
      unit: "units",
      price: 35,
      currency: "USD",
      name: "Men's S3XY Tee",
    },
    {
      description:
        "Designed for fit, comfort and style, the Men's 3D Wordmark Long Sleeve Tee is made from 100% cotton and features an understated wordmark logo on the left chest.",
      stock: 15,
      unit: "units",
      price: 40,
      currency: "USD",
      name: "Men's 3D Wordmark Long Sleeve Tee",
    },
    {
      description:
        "Designed for fit, comfort and style, the Men's 3D T Logo Long Sleeve Tee is made from 100% cotton and features an understated T logo on the left chest.",
      stock: 12,
      unit: "units",
      price: 40,
      currency: "USD",
      name: "Men's 3D T Logo Long Sleeve Tee",
    },
    {
      description:
        "Introducing the Tesla Raven Collection. The Men's Raven Lightweight Hoodie has a premium, relaxed silhouette made from a sustainable bamboo cotton blend. The hoodie features subtle thermoplastic polyurethane Tesla logos across the chest and on the sleeve with a french terry interior for versatility in any season. Made from 70% bamboo and 30% cotton.",
      stock: 10,
      unit: "units",
      price: 115,
      currency: "USD",
      name: "Men's Raven Lightweight Hoodie",
    },
    {
      description:
        "Introducing the Tesla Chill Collection. The Chill Pullover Hoodie has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The unisex hoodie features subtle thermoplastic polyurethane Tesla logos across the chest and on the sleeve, a double layer single seam hood and pockets with custom matte zipper pulls. Made from 60% cotton and 40% recycled polyester.",
      stock: 10,
      unit: "units",
      price: 130,
      currency: "USD",
      name: "Chill Pullover Hoodie",
    },
    {
      description:
        "Introducing the Tesla Chill Collection. The Men's Chill Full Zip Hoodie has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The hoodie features subtle thermoplastic polyurethane Tesla logos on the left chest and sleeve, a double layer single seam hood and pockets with custom matte zipper pulls. Made from 60% cotton and 40% recycled polyester.",
      stock: 100,
      unit: "units",
      price: 85,
      currency: "USD",
      name: "Men's Chill Full Zip Hoodie",
    },
    {
      description:
        "Introducing the Tesla Chill Collection. The Men’s Chill Quarter Zip Pullover has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The pullover features subtle thermoplastic polyurethane Tesla logos on the left chest and below the back collar, as well as a custom matte zipper pull. Made from 60% cotton and 40% recycled polyester.",
      stock: 7,
      unit: "units",
      price: 85,
      currency: "USD",
      name: "Men's Chill Quarter Zip Pullover - Gray",
    },
    {
      description:
        "Introducing the Tesla Chill Collection. The Men’s Chill Quarter Zip Pullover has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The pullover features subtle thermoplastic polyurethane Tesla logos on the left chest and below the back collar, as well as a custom matte zipper pull. Made from 60% cotton and 40% recycled polyester.",
      stock: 15,
      unit: "units",
      price: 85,
      currency: "USD",
      name: "Men's Chill Quarter Zip Pullover - White",
    },
    {
      description:
        "The Unisex 3D Large Wordmark Pullover Hoodie features soft fleece and an adjustable, jersey-lined hood for comfort and coverage. Designed in a unisex style, the pullover hoodie includes a tone-on-tone 3D silicone-printed wordmark across the chest.",
      stock: 15,
      unit: "units",
      price: 70,
      currency: "USD",
      name: "3D Large Wordmark Pullover Hoodie",
    },
    {
      description:
        "As with the iconic Tesla logo, the Cybertruck Graffiti Hoodie is a classic in the making. Unisex style featuring soft fleece and an adjustable, jersey-lined hood for comfortable coverage.",
      stock: 13,
      unit: "units",
      price: 60,
      currency: "USD",
      name: "Cybertruck Graffiti Hoodie",
    },
    {
      description:
        "The Relaxed T Logo Hat is a classic silhouette combined with modern details, featuring a 3D T logo and a custom metal buckle closure. The ultrasoft design is flexible and abrasion resistant, while the inner sweatband includes quilted padding for extra comfort and moisture wicking. The visor is fully made from recycled plastic bottles. 100% Cotton.",
      stock: 11,
      unit: "units",
      price: 30,
      currency: "USD",
      name: "Relaxed T Logo Hat",
    },
    {
      description:
        "The Relaxed T Logo Hat is a classic silhouette combined with modern details, featuring a 3D T logo and a custom metal buckle closure. The ultrasoft design is flexible and abrasion resistant, while the inner sweatband includes quilted padding for extra comfort and moisture wicking. The visor is fully made from recycled plastic bottles. 100% Cotton.",
      stock: 13,
      unit: "units",
      price: 35,
      currency: "USD",
      name: "Thermal Cuffed Beanie",
    },
    {
      description:
        "The Women's Cropped Puffer Jacket features a uniquely cropped silhouette for the perfect, modern style while on the go during the cozy season ahead. The puffer features subtle silicone injected Tesla logos below the back collar and on the right sleeve, custom matte metal zipper pulls and a soft, fleece lined collar. Made from 87% nylon and 13% polyurethane.",
      stock: 85,
      unit: "units",
      price: 225,
      currency: "USD",
      name: "Women's Cropped Puffer Jacket",
    },
    {
      description:
        "Introducing the Tesla Chill Collection. The Women's Chill Half Zip Cropped Hoodie has a premium, soft fleece exterior and cropped silhouette for comfort in everyday lifestyle. The hoodie features an elastic hem that gathers at the waist, subtle thermoplastic polyurethane Tesla logos along the hood and on the sleeve, a double layer single seam hood and a custom ring zipper pull. Made from 60% cotton and 40% recycled polyester.",
      stock: 10,
      unit: "units",
      price: 130,
      currency: "USD",
      name: "Women's Chill Half Zip Cropped Hoodie",
    },
    {
      description:
        "Introducing the Tesla Raven Collection. The Women's Raven Slouchy Crew Sweatshirt has a premium, relaxed silhouette made from a sustainable bamboo cotton blend. The slouchy crew features a subtle thermoplastic polyurethane Tesla wordmark on the left sleeve and a french terry interior for a cozy look and feel in every season. Pair it with your Raven Joggers or favorite on the go fit. Made from 70% bamboo and 30% cotton.",
      stock: 9,
      unit: "units",
      price: 110,
      currency: "USD",
      name: "Women's Raven Slouchy Crew Sweatshirt",
    },
    {
      description:
        "Introducing the Tesla Turbine Collection. Designed for style, comfort and everyday lifestyle, the Women's Turbine Cropped Long Sleeve Tee features a subtle, water-based Tesla wordmark across the chest and our T logo below the back collar. The lightweight material is double-dyed, creating a soft, casual style with a cropped silhouette. Made from 50% cotton and 50%",
      stock: 10,
      unit: "units",
      price: 45,
      currency: "USD",
      name: "Women's Turbine Cropped Long Sleeve Tee",
    },
    {
      description:
        "ntroducing the Tesla Turbine Collection. Designed for style, comfort and everyday lifestyle, the Women's Turbine Cropped Short Sleeve Tee features a subtle, water-based Tesla wordmark across the chest and our T logo below the back collar. The lightweight material is double-dyed, creating a soft, casual style with a cropped silhouette. Made from 50% cotton and 50% polyester.",
      stock: 0,
      unit: "units",
      price: 40,
      currency: "USD",
      name: "Women's Turbine Cropped Short Sleeve Tee",
    },
    {
      description:
        "Designed for style and comfort, the ultrasoft Women's T Logo Short Sleeve Scoop Neck Tee features a tonal 3D silicone-printed T logo on the left chest. Made of 50% Peruvian cotton and 50% Peruvian viscose.",
      stock: 30,
      unit: "units",
      price: 35,
      currency: "USD",
      name: "Women's T Logo Short Sleeve Scoop Neck Tee",
    },
    {
      description:
        "Designed for style and comfort, the ultrasoft Women's T Logo Long Sleeve Scoop Neck Tee features a tonal 3D silicone-printed T logo on the left chest. Made of 50% Peruvian cotton and 50% Peruvian viscose.",
      stock: 16,
      unit: "units",
      price: 40,
      currency: "USD",
      name: "Women's T Logo Long Sleeve Scoop Neck Tee",
    },
    {
      description:
        "Designed for style and comfort, the Women's Small Wordmark Short Sleeve V-Neck Tee features a tonal 3D silicone-printed wordmark on the left chest. Made of 100% Peruvian cotton.",
      stock: 18,
      unit: "units",
      price: 35,
      currency: "USD",
      name: "Women's Small Wordmark Short Sleeve V-Neck Tee",
    },
    {
      description:
        "Designed for style and comfort, the Women's Large Wordmark Short Sleeve Crew Neck Tee features a tonal 3D silicone-printed wordmark across the chest. Made of 100% Peruvian pima cotton.",
      stock: 5,
      unit: "units",
      price: 35,
      currency: "USD",
      name: "Women's Large Wordmark Short Sleeve Crew Neck Tee",
    },
    {
      description:
        "Designed to celebrate Tesla's incredible performance mode, the Plaid Mode Tee features great fit, comfort and style. Made from 100% cotton, it's the next best thing to riding shotgun at the Nürburgring.",
      stock: 16,
      unit: "units",
      price: 35,
      currency: "USD",
      name: "Women's Plaid Mode Tee",
    },
    {
      description:
        "Inspired by our popular home battery, the Tesla Powerwall Tee is made from 100% cotton and features the phrase 'Pure Energy' under our signature logo in the back. Designed for fit, comfort and style, the exclusive tee promotes sustainable energy in any",
      stock: 10,
      unit: "units",
      price: 130,
      currency: "USD",
      name: "Women’s Powerwall Tee",
    },
    {
      description:
        "Fully customized and uniquely styled, the Women's Corp Jacket features a silicone-printed 'T' logo on the left chest and prominent Tesla wordmark across the back.",
      stock: 3,
      unit: "units",
      price: 90,
      currency: "USD",
      name: "Women's Corp Jacket",
    },
    {
      description:
        "Introducing the Tesla Raven Collection. The Women's Raven Joggers have a premium, relaxed silhouette made from a sustainable bamboo cotton blend. The joggers feature a subtle thermoplastic polyurethane Tesla wordmark and T logo and a french terry interior for a cozy look and feel in every season. Pair them with your Raven Slouchy Crew Sweatshirt, Raven Lightweight Zip Up Jacket or other favorite on the go fit. Made from 70% bamboo and 30% cotton.",
      stock: 162,
      unit: "units",
      price: 100,
      currency: "USD",
      name: "Women's Raven Joggers",
    },
    {
      description:
        "Designed for fit, comfort and style, the Kids Cybertruck Graffiti Long Sleeve Tee features a water-based Cybertruck graffiti wordmark across the chest, a Tesla wordmark down the left arm and our signature T logo on the back collar. Made from 50% cotton and 50% polyester.",
      stock: 10,
      unit: "units",
      price: 30,
      currency: "USD",
      name: "Kids Cybertruck Long Sleeve Tee",
    },
    {
      description:
        "The Kids Scribble T Logo Tee is made from 100% Peruvian cotton and features a Tesla T sketched logo for every young artist to wear.",
      stock: 0,
      unit: "units",
      price: 25,
      currency: "USD",
      name: "Kids Scribble T Logo Tee",
    },
    {
      description:
        "The Kids Cybertruck Tee features the iconic Cybertruck graffiti wordmark and is made from 100% Peruvian cotton for maximum comfort.",
      stock: 10,
      unit: "units",
      price: 25,
      currency: "USD",
      name: "Kids Cybertruck Tee",
    },
    {
      description:
        "The refreshed Kids Racing Stripe Tee is made from 100% Peruvian cotton, featuring a newly enhanced racing stripe with a brushed Tesla wordmark that's perfect for any speed racer.",
      stock: 10,
      unit: "units",
      price: 30,
      currency: "USD",
      name: "Kids Racing Stripe Tee",
    },
    {
      description:
        "Designed for fit, comfort and style, the Tesla T Logo Tee is made from 100% Peruvian cotton and features a silicone-printed T Logo on the left chest.",
      stock: 10,
      unit: "units",
      price: 30,
      currency: "USD",
      name: "Kids 3D T Logo Tee",
    },
    {
      description:
        "The checkered tee is made from long grain, GMO free Peruvian cotton. Peru is the only country in the world where cotton is picked by hand on a large scale. The 4,500-year-old tradition prevents damage to the fiber during the picking process and removes the need to use chemicals to open the cotton plants before harvest. This environmentally friendly process results in cotton that is soft, strong, and lustrous – and the tee will get even softer with every wash.",
      stock: 10,
      unit: "units",
      price: 30,
      currency: "USD",
      name: "Kids Checkered Tee",
    },
    {
      description:
        "For the future space traveler with discerning taste, a soft, cotton onesie with snap closure bottom. Clear labeling provided in case of contact with a new spacefaring civilization. 100% Cotton. Made in Peru",
      stock: 16,
      unit: "units",
      price: 25,
      currency: "USD",
      name: "Made on Earth by Humans Onesie",
    },
    {
      description:
        "The Kids Scribble T Logo Onesie is made from 100% Peruvian cotton and features a Tesla T sketched logo for every little artist to wear.",
      stock: 0,
      unit: "units",
      price: 30,
      currency: "USD",
      name: "Scribble T Logo Onesie",
    },
    {
      description:
        "Show your commitment to sustainable energy with this cheeky onesie for your young one. Note: Does not prevent emissions. 100% Cotton. Made in Peru.",
      stock: 10,
      unit: "units",
      price: 30,
      currency: "USD",
      name: "Zero Emissions (Almost) Onesie",
    },
    {
      description:
        "Wear your Kids Cyberquad Bomber Jacket during your adventures on Cyberquad for Kids. The bomber jacket features a graffiti-style illustration of our Cyberquad silhouette and wordmark. With three zippered pockets and our signature T logo and Tesla wordmark printed along the sleeves, Kids Cyberquad Bomber Jacket is perfect for wherever the trail takes you. Made from 60% cotton and 40% polyester.",
      stock: 10,
      unit: "units",
      price: 65,
      currency: "USD",
      name: "Kids Cyberquad Bomber Jacket",
    },
    {
      description:
        "Cruise the playground in style with the Kids Corp Jacket. Modeled after the original Tesla Corp Jacket, the Kids Corp Jacket features the same understated style and high-quality materials but at a pint-sized scale.",
      stock: 10,
      unit: "units",
      price: 30,
      currency: "USD",
      name: "Kids Corp Jacket",
    },
  ],
};
