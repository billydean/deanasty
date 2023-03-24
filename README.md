# "DEAN"asty, a Dynastic Lineage and History Generator

## Description
Deanasty generates an individual, set in a neutral environment, and then sketches out their legacy and lineage year-by-year with every click. Feedback loops ensure that historical context evolves along with any newly generated family members. In later versions, generated content ought to be available in log format (i.e. as annals of historically significant events), as a timeline, or as a dynastic family tree.

More TBD.

## Running the Project
Deanasty currently only runs locally. After installing dependencies with yarn, "yarn run start" should launch the application.

More TBD.

## Instructions
Because all calculations and generated assets are kept in state, the user should be able to switch freely between the different views indicated on the left-hand side. 

At the top, "Start" will generate the founder of the family (at Year 0). "Next" will progress the simulation/generator by one year. "Restart" will wipe any generated content and revert to the app's initial state.

More TBD.

## Motivation
The main limitation on many random character (etc) generators I'm familiar with is the relatively narrow range of options elements are selected from. 

If a writer or GM is looking to a generator for inspiration, they might also turn to an AI generator (either generating images or text using predictive models). With both kinds of generators, though, there is typically little (if any) connective tissue between aspects or elements of the generated product. 

I want to develop a self-informed generator, where later calculations are influenced by earlier results. For example: A warlike figure is more likely to wage war. Waging war will affect the overall political climate. People born in unstable climates are more likely to die in war. And so on. 

Generated results are still intended to be "jumping off points" for authors and GMs, but I want them to have enough internal cohesion to be believable (and hopefully, useful). 

## Version in Development - v0.2 : Trees
    - [ ] Generated persons displayed in family tree.
    - [ ] TEMPORARY/ Hierarchical format of state.people alongside normal people arrays (to work with d3)
    - [ ] Node style distinguishes blood and marriage membership.
    - [ ] Node style distinguishes living and dead members.
    - [ ] Node style distinguishes title holders and (graded) line of succession.
    - [ ] New nodes highlighted once/if generated in tree view.
    - [ ] User can specify number of generations in tree view.
    - [ ] User can filter for living members, those in line of succession, and can filter out "dead and childless" members.
    - [ ] Both "full" and "minified" views of family tree available.
    - [ ] Process/ Fill in any missing documentation or comments.
    - [ ] Process/ Export all documentation, comments in order to plan any necessary refactoring or restructuring.
    - [ ] Feature/ Inherited risk factors actually have consequences.
    - [ ] HUGE FIX/ Rewire *everything* to work with hierarchical format of "people" (from arrays to single object...)

### Roadmap
- v0.3: Warfare
    - [ ] War can be declared or break out.
    - [ ] Local, regional, and global stability values now active.
    - [ ] Active war affects local and regional values.
    - [ ] Local, regional, and global values influences odds of war.
    - [ ] When sufficiently unstable, regional stability can affect global value.
    - [ ] Local value affects "smallfolk."
    - [ ] Smallfolk have "satisfaction" property.
    - [ ] Displeased smallfolk can break out in rebellion.
    - [ ] "Rebellion" is one of several war categories.
    - [ ] A person can be involved or affected by war in different ways.
    - [ ] If in battle, person may die.
    - [ ] Winning a battle can earn a person (currently dummy) accolades.
    - [ ] War and battle-related events appear in the news.
    - [ ] If invaded, non-combatants may also die.
    - [ ] Person.condition now includes "morale"
    - [ ] Winning increases morale; morale decreases when lose, or when family member dies in war.
    - [ ] Depending on war category, low morale can end war.
    - [ ] Otherwise, war ends somewhat randomly.
    - [ ] Ending war affects local, regional, and (potentially) global values.
- v0.4: Environment
    - [ ] "Plague" is a world historical event rather than just another disease.
- v0.5: Timeline
- v0.6: Diplomacy
- v0.6: Intrigue
- v0.7: Style
- v0.8: Promulgation
- v0.8: Prestige
- v0.9: Zoom
- v0.9: Culture
- v?.? TBD

### History
- v0.1: Generations
    - [x] People have "genes," a.k.a. inborn dispositions, risk factors, and traits.
    - [x] Genes are passed down (imperfectly!).
    - [x] Genetics are (sometimes) mendelian.
    - [x] Some genetic elements appear in the news.
    - [x] Disease and acquired immunity now appear in Person.conditions.
    - [x] Lower base odds of being infected by contagion.
    - [x] Contagion odds are now influenced by number of active cases.
    - [x] Fix/ Contagions are less frequent.
    - [x] Fix/ Contagions are more deadly.
    - [x] Fix/ Arrays now transformed rather than repeatedly re-mapped when updating state.
    - [x] Fix/ Obsolete fragments and commented-out code cleaned up.
    - [x] Fix/ Code re-factored. Minor changes.
    - [x] Fix/ All "bracket function" rates (dates, marriage, etc) adjusted to prepare for future additions.

#### Creation and Contribution
Copyright &copy; 2023 Billy Dean Goehring

Since I devised this project as an opportunity to practice and grow as a developer, I certainly welcome any suggestions or recommendations on how to improve its performance or build on its design. I'd love your feedback, and if it turns out this tool becomes useful for writers or TTRPG enthusiasts in the future, I'd certainly welcome any contributions. 