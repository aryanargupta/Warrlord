#![no_main]

use std::cmp;
use risc0_zkvm::guest::env;
use std::io::Read;
risc0_zkvm::guest::entry!(main);

#[derive(serde::Serialize, serde::Deserialize)]
struct Params {
    troops: Vec<GameEntity>,
    cannons: Vec<GameEntity>,
    townhall: GameEntity,
}

#[derive(serde::Serialize, serde::Deserialize)]
struct GameEntity {
    name: String,
    health: i32,
    attack: i32,
    position: (i32, i32),
    fire_rate: i64, // Time b/w two attacks in s
}

impl GameEntity {
  // Function to calculate the distance between this entity and another
  fn distance_to(&self, other: &GameEntity) -> i32 {
    let (x1, y1) = self.position;
    let (x2, y2) = other.position;
    let x_diff = (x2 - x1).abs();
    let y_diff = (y2 - y1).abs();
    
    ((x_diff * x_diff + y_diff * y_diff) as f64).sqrt().ceil() as i32 // Using ceiling to round up
  }
}

fn calculate_attack_time(distance: i32, moving_speed: i32) -> i64 {
    (distance as f64 / moving_speed as f64).ceil() as i64
  }

fn simulate_attack(
    troops: &mut Vec<GameEntity>,
    cannons: &mut Vec<GameEntity>,
    townhall: &mut GameEntity,
  ) -> i32 {
      let moving_speed = 100; 
  
      let distance1 = troops[0].distance_to(&cannons[0]);
      let distance2 = troops[1].distance_to(&cannons[1]);
      let attack_start_time = calculate_attack_time(cmp::min(distance1, distance2), moving_speed);
      
      let time_step = 1;
      let mut current_time = 0;
      let total_time = 45;
  
      let mut destruction = 0;
  
      while current_time < total_time {
        //   println!("Current time: {:?}", current_time);
  
          if current_time >= attack_start_time {
            //   println!("Attack phase starts");
  
              // Cannon 1 fires at Charizard 1 every 3 seconds
              {
                  let cannon1 = &mut cannons[0];
                  if let Some(charizard1) = troops.get_mut(0) {
                      if (current_time % cannon1.fire_rate) == 0 {
                          if charizard1.health > 0 && cannon1.health > 0 {
                              charizard1.health -= cannon1.attack;
                            //   println!(
                            //       "Cannon 1 attacks Charizard 1. Charizard 1 health: {}",
                            //       charizard1.health
                            //   );
                          }
                      }
                  }
              }
  
              // Cannon 2 fires at Charizard 2 every 3 seconds
              {
                  let cannon2 = &mut cannons[1];
                  if let Some(charizard2) = troops.get_mut(1) {
                      if (current_time % cannon2.fire_rate) == 0 {
                          if charizard2.health > 0 && cannon2.health > 0 {
                              charizard2.health -= cannon2.attack;
                            //   println!(
                            //       "Cannon 2 attacks Charizard 2. Charizard 2 health: {}",
                            //       charizard2.health
                            //   );
                          }
                      }
                  }
              }
  
              // Charizard 1 fires at Cannon 1 every 4 seconds
              {
                  if let (Some(charizard1), Some(cannon1)) = (troops.get_mut(0), cannons.get_mut(0)) {
                      if (current_time % charizard1.fire_rate) == 0 {
                          if charizard1.health > 0 && cannon1.health > 0 {
                              cannon1.health -= charizard1.attack;
                            //   println!("Charizard 1 attacks Cannon 1. Cannon 1 health: {}", cannon1.health);
                              if cannon1.health <= 0 {
                                  destruction += 1;
                                //   println!("Cannon 1 is destroyed");
                              }
                          }
                      }
                  }
              }
  
              // Charizard 2 fires at Cannon 2 every 4 seconds
              {
                  if let (Some(charizard2), Some(cannon2)) = (troops.get_mut(1), cannons.get_mut(1)) {
                      if (current_time % charizard2.fire_rate) == 0 {
                          if charizard2.health > 0 && cannon2.health > 0 {
                              cannon2.health -= charizard2.attack;
                            //   println!("Charizard 2 attacks Cannon 2. Cannon 2 health: {}", cannon2.health);
                              if cannon2.health <= 0 {
                                  destruction += 1;
                                //   println!("Cannon 2 is destroyed");
                              }
                          }
                      }
                  }
              }
  
              // If all cannons are destroyed, attack the townhall
              if cannons.iter().all(|c| c.health <= 0) {
                //   println!("All cannons destroyed, attacking townhall");
                  for troop in troops.iter_mut() {
                      if troop.health > 0 && (current_time % troop.fire_rate) == 0 {
                          if townhall.health > 0 {
                              townhall.health -= troop.attack;
                            //   println!(
                            //       "{} attacks Townhall. Townhall health: {}",
                            //       troop.name,
                            //       townhall.health
                            //   );
                              if townhall.health <= 0 {
                                  destruction += 1;
                                //   println!("Townhall is destroyed");
                              }
                          }
                      }
                  }
              }
          }
  
          current_time += time_step;
      }
  
    //   println!("Total destruction: {}", destruction);
  
      destruction
}

fn main() {
    let mut input_vector = Vec::new();
    env::stdin().read_to_end(&mut input_vector).unwrap();
    let input: Params = bincode::deserialize(&input_vector).unwrap();

    let mut troops = input.troops;
    let mut cannons = input.cannons;
    let mut townhall = input.townhall;

    let result = simulate_attack(&mut troops, &mut cannons, &mut townhall);
    env::commit(&result);
}
