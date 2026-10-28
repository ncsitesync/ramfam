/* =====================================================================
   RAMFAM BUILDERS: PROJECT PHOTOS (shared by index.html and gallery.html)
   ---------------------------------------------------------------------
   Edit this ONE list to add, remove, or reorder job photos on both pages.

   One line per photo:
     src      : large photo for the lightbox   (images/gallery/<name>-full.jpg)
     thumb    : smaller photo for cards/grids  (images/gallery/<name>-thumb.jpg)
                A .webp twin of each file is used automatically where supported.
     w, h     : pixel size of the full photo (prevents layout jumps)
     category : "homes", "interiors", "remodels", "concrete" or "septic"
                (a category with no photos is hidden everywhere until you add some)
     project  : which project it belongs to (see RAMFAM_PROJECTS below)
     alt      : what the photo shows (for screen readers and Google)
     caption  : short note shown in the lightbox
     featured : a number (1, 2, 3…) → ALSO show it in the home-page "Recent Projects"
                carousel, in that order (about 8). Leave it off to show it only in the gallery.

   To add photos: put the originals in this folder, add them to the list at the top of
   tools/optimize-photos.js, run "node tools/optimize-photos.js", then add lines below.
   ===================================================================== */

/* Project names shown in the gallery (the street address is intentionally left out). */
window.RAMFAM_PROJECTS = {
  havelock: "Havelock, NC",
  // REPLACE: rename this project (e.g. "New Bern, NC" or "3-Bed Ranch, Jacksonville NC")
  "custom-home-2": "Custom Home Project",
  // REPLACE: rename this project too (blue-gray ranch home, image2-16 photos)
  "ranch-home": "Ranch Home Project",
  "septic-work": "Septic Work",
};

window.RAMFAM_PHOTOS = (function () {
  const G = "images/gallery/";
  const p = (name, w, h, category, project, alt, caption, featured) =>
    ({ src: G + name + "-full.jpg", thumb: G + name + "-thumb.jpg", w, h, category, project, alt, caption, featured: !!featured, order: featured || 0 });
  return [
    // ---- Custom Homes · Havelock, NC (161 Heron Dr. photos) ----
    p("havelock-home-37", 602, 640, "homes", "havelock", "Three-story white coastal home on pilings with double covered porches, a wooden front staircase and a paver walkway", "Front elevation with double covered porches", 1),
    p("havelock-home-34", 640, 510, "homes", "havelock", "Raised coastal home at the end of a curving paver walkway, framed by a wide lawn and tall pines", "Paver walkway up to the front stairs", 2),
    p("havelock-home-51", 640, 468, "homes", "havelock", "White three-story home on pilings with a full-width covered porch and a wide concrete driveway", "Front view with the new driveway"),
    p("havelock-home-58", 640, 428, "homes", "havelock", "Corner view of a raised white home with a covered porch, side staircase and green lawn", "Corner view with the side staircase"),
    p("havelock-home-61", 640, 428, "homes", "havelock", "Raised white home with board-and-batten siding, a two-level porch and a long wooden staircase", "Side porch and staircase", 3),
    p("havelock-home-63", 640, 428, "homes", "havelock", "Rear of a raised white home with a long deck, wooden stairs and new landscaping", "Rear deck and stairs"),
    p("havelock-home-45", 640, 428, "homes", "havelock", "Side of a raised home with a covered porch, pine ceiling and board-and-batten siding", "Side porch with tongue-and-groove pine ceiling"),
    p("havelock-home-26", 427, 640, "homes", "havelock", "Stained wood double front doors with glass panes and black lanterns on white board-and-batten siding", "Double entry doors"),
    p("havelock-home-25", 427, 640, "homes", "havelock", "Covered porch with a pine plank ceiling, ceiling fan, white railings and a wicker chair overlooking the woods", "Covered porch with pine ceiling", 6),
    p("havelock-home-30", 427, 640, "homes", "havelock", "View down wide wooden front stairs to a curving paver walkway and lawn", "Front stairs and paver walkway"),
    p("havelock-home-31", 427, 640, "homes", "havelock", "Paver patio beneath the raised porch, with white columns and a stone planter", "Paver patio under the porch"),
    p("havelock-home-15", 640, 428, "homes", "havelock", "Kitchen with white shaker cabinets, wood pendant lights, a wood range hood and a marble-top island with woven stools", "Kitchen with marble-top island", 7),
    p("havelock-home-14", 640, 428, "homes", "havelock", "Kitchen island with woven bar stools, a stainless refrigerator and a custom wood range hood", "Kitchen island and range wall"),
    p("havelock-home-18", 427, 640, "homes", "havelock", "Gas range under a custom wood hood, white cabinets and a window over the sink", "Range wall with custom wood hood"),
    p("havelock-home-17", 427, 640, "homes", "havelock", "Long marble kitchen island under wood pendant lights, looking toward wood French doors", "Marble island and French doors"),
    p("havelock-home-12", 640, 428, "homes", "havelock", "Vaulted living room with tall windows, a gray sofa and a wall-mounted TV over a console", "Vaulted living room"),
    p("havelock-home-20", 427, 640, "homes", "havelock", "Wood double doors with glass panes opening to the porch, with wide-plank oak floors", "French doors to the porch"),
    p("havelock-home-11", 395, 640, "homes", "havelock", "Staircase with white oak treads, a wood newel post and black iron balusters", "White oak staircase"),
    p("havelock-home-09", 640, 428, "homes", "havelock", "Primary bathroom with a walnut double vanity, arched wood mirrors, brass fixtures and a blue shiplap wall", "Primary bath double vanity", 10),
    p("havelock-home-08", 414, 640, "homes", "havelock", "Walnut double vanity with marble top, brass faucets and sconces against a blue shiplap wall", "Vanity with brass fixtures"),
    p("havelock-home-06", 375, 640, "homes", "havelock", "Walk-in shower with white subway tile, a floral mosaic accent and bronze rain head", "Walk-in tile shower"),

    // ---- Custom Homes · Custom Home Project (0P7A photos) ----
    p("project-8671", 640, 428, "homes", "custom-home-2", "New single-story home with white vinyl siding, black shutters, a two-car garage and a wide concrete driveway", "Front view with two-car garage", 4),
    p("project-8711", 640, 428, "homes", "custom-home-2", "Front of a new white home with a two-car garage, covered entry and a freshly poured concrete driveway", "New concrete driveway"),
    p("project-8719", 427, 640, "homes", "custom-home-2", "RamFam Builders yard sign in front of a newly finished white home with black shutters", "Finished and ready for move-in"),
    p("project-8659", 640, 428, "homes", "custom-home-2", "Back of a new white single-story home with a covered rear porch", "Rear elevation with covered porch"),
    p("project-8689", 640, 428, "homes", "custom-home-2", "Open kitchen with white shaker cabinets, an island, pendant lights, stainless appliances and wood-look floors", "Open kitchen with island", 8),
    p("project-8691", 640, 428, "homes", "custom-home-2", "Kitchen island and sink under a window, with white cabinets and a gray subway tile backsplash", "Island and sink wall"),
    p("project-8692", 427, 640, "homes", "custom-home-2", "Stainless range and microwave set in white shaker cabinets with gray subway tile", "Range and cabinets"),
    p("project-8696", 640, 428, "homes", "custom-home-2", "Undermount sink and chrome faucet on a white quartz countertop with gray subway tile", "Quartz countertop detail"),

    // ---- Custom Homes · Ranch Home Project (exteriors) ----
    p("ranch-home-03", 640, 427, "homes", "ranch-home", "New single-story home with blue-gray siding, black shutters, a covered front porch and a brick foundation on a wide lawn", "Front elevation"),
    p("ranch-home-04", 640, 391, "homes", "ranch-home", "Back of a blue-gray ranch home with a gabled porch on white columns, a ceiling fan and brick steps", "Covered back porch"),

    // ---- Interiors · Ranch Home Project ----
    p("ranch-home-11", 427, 640, "interiors", "ranch-home", "White kitchen with a large island, glass globe pendant lights, a farmhouse sink under the window and gray wood-look floors", "Kitchen with island and farmhouse sink"),
    p("ranch-home-06", 427, 640, "interiors", "ranch-home", "Gas range under a white shaker range hood with a marble-look slab backsplash and brass cabinet pulls", "Range wall with marble-look backsplash"),
    p("ranch-home-13", 428, 640, "interiors", "ranch-home", "Kitchen with white shaker cabinets, a stainless gas range and pendant lights, looking down to the back door", "Kitchen toward the back door"),
    p("ranch-home-12", 640, 427, "interiors", "ranch-home", "Open living room and kitchen with a fireplace wall, a woven pendant light and a back door with a window", "Open living room and kitchen"),
    p("ranch-home-15", 427, 640, "interiors", "ranch-home", "Living area under a woven drum chandelier, with the fireplace wall and a kitchen island under glass pendants", "Living area under the woven chandelier"),
    p("ranch-home-09", 427, 640, "interiors", "ranch-home", "Board-and-batten feature wall with a linear electric fireplace, a wood beam mantel and a ceiling fan above", "Fireplace feature wall"),
    p("ranch-home-14", 427, 640, "interiors", "ranch-home", "Woven rattan drum chandelier with brass hardware hanging from a white ceiling", "Woven drum chandelier"),
    p("ranch-home-02", 427, 640, "interiors", "ranch-home", "Bathroom double vanity with white shaker cabinets, a quartz top, arched black mirrors, brushed-gold faucets and a sconce", "Double vanity with brass fixtures"),
    p("ranch-home-16", 427, 640, "interiors", "ranch-home", "Walk-in shower with large marble-look wall panels, a brushed-gold shower head and a handheld wand", "Marble-look walk-in shower"),
    p("ranch-home-10", 427, 640, "interiors", "ranch-home", "Hallway with tall white shaker pantry cabinets beside a doorway, on gray wood-look floors", "Built-in hall cabinets"),

    // ---- Septic · Septic Work ----
    p("septic-03", 1200, 1600, "septic", "septic-work", "Long drain field trench with a newly installed black plastic chamber system and distribution box, beside a golf course", "New drain field chamber install", 5),
    p("septic-02", 1200, 1600, "septic", "septic-work", "Freshly dug tank excavation in red clay with a boom truck carrying a precast concrete septic tank across a field", "Tank delivery to the excavation", 9),
    p("septic-04", 1200, 1600, "septic", "septic-work", "Concrete septic tank lid and distribution box set in red clay, with the drain field line running toward the trench", "Tank and distribution box set"),
    p("septic-06", 1200, 1600, "septic", "septic-work", "Open riser on a concrete septic tank lid showing a new effluent filter, with a white PVC inlet pipe", "Tank riser with new effluent filter"),
    p("septic-01", 1200, 1600, "septic", "septic-work", "Looking into a concrete septic tank through the riser opening at a new red-capped effluent filter cartridge", "Effluent filter replacement"),
    p("septic-05", 1200, 1600, "septic", "septic-work", "Graded drain field area marked with caution tape behind a gray two-story home", "Drain field graded and marked"),
  ];
})();
