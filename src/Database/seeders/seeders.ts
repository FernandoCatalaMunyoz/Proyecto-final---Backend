import { Artist } from "../../Models/Artist";
import { Genre } from "../../Models/Genre";
import { Role } from "../../Models/Role";
import { User } from "../../Models/User";
import { Event } from "../../Models/Event";
import { AppDataSource } from "../db";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { Club } from "../../Models/Club";
import { ArtistEvent } from "../../Models/Artist-Event";
import { artistSeedDatabase } from "./artistsSeeder";
import { eventSeedDatabase } from "./eventsSeeder";
import { clubSeedDatabase } from "./clubsSeeder";

const roleSeedDataBase = async () => {
  try {
    await AppDataSource.initialize();
    const roleUser = new Role();
    roleUser.name = "user";
    roleUser.id = 1;
    await roleUser.save();

    const roleSuperAdmin = new Role();
    roleSuperAdmin.name = "super_admin";
    roleSuperAdmin.id = 2;
    await roleSuperAdmin.save();
  } catch (error) {
    console.log(error);
  } finally {
    await AppDataSource.destroy();
  }
};

const userSeedDatabase = async () => {
  try {
    await AppDataSource.initialize();
    //Creacion usuario User
    const user = new User();
    user.firstName = "user";
    user.lastName = "user";
    user.country = "spain";
    user.email = "user@user.com";
    user.password = bcrypt.hashSync("Aa123456", 5); //Aa123456
    user.role = new Role();
    user.role.id = 1;
    await user.save();

    // Creacion usuario "super_admin"
    const super_admin = new User();
    super_admin.firstName = "super_admin";
    super_admin.lastName = "super_admin";
    super_admin.country = "spain";
    super_admin.email = "super_admin@super_admin.com";
    super_admin.password = bcrypt.hashSync("Aa123456", 8); // 123456
    super_admin.role = new Role();
    super_admin.role.id = 2;
    await super_admin.save();

    //Creacion usuarios falsos
    const generateFakeUser = () => {
      const user = new User();
      user.firstName = faker.person.firstName();
      user.lastName = faker.person.lastName();
      user.country = faker.location.country();
      user.email = faker.internet.email();
      user.password = bcrypt.hashSync("123456", 8); // 123456
      user.role = new Role();
      user.role.id = 1;

      return user;
    };
    const fakeUsers = Array.from({ length: 15 }, generateFakeUser);
    await User.save(fakeUsers);
  } catch (error) {
    console.log(error);
  } finally {
    await AppDataSource.destroy();
  }
};

//Creacion generos

const genresSeedDatabase = async () => {
  try {
    await AppDataSource.initialize();

    const genre = new Genre();
    genre.name = "House";
    await genre.save();

    const genre2 = new Genre();
    genre2.name = "Techno";
    await genre2.save();

    const genre3 = new Genre();
    genre3.name = "HardTechno";
    await genre3.save();

    const genre4 = new Genre();
    genre4.name = "HardStyle";
    await genre4.save();

    const genre5 = new Genre();
    genre5.name = "Tech-House";
    await genre5.save();
  } catch (error) {
    console.log(error);
  } finally {
    await AppDataSource.destroy();
  }
};

//CREACION SEEDER ARTISTAS-EVENTOS
const artistEventSeedDatabase = async () => {
  await AppDataSource.initialize();
  try {
    const generateFakeEventArtist = () => {
      const eventArtist = new ArtistEvent();
      eventArtist.event = new Event();
      eventArtist.event.id = faker.number.int({ min: 1, max: 20 });
      eventArtist.artist = new Artist();
      eventArtist.artist.id = faker.number.int({ min: 1, max: 20 });
      return eventArtist;
    };
    const fakeArtistEvent = Array.from(
      { length: 200 },
      generateFakeEventArtist
    );
    await ArtistEvent.save(fakeArtistEvent);
  } catch (error) {
  } finally {
    await AppDataSource.destroy();
  }
};
const startSeeder = async () => {
  await roleSeedDataBase();
  await userSeedDatabase();
  await genresSeedDatabase();
  await artistSeedDatabase();
  await clubSeedDatabase();
  await eventSeedDatabase();
  await artistEventSeedDatabase();
};
startSeeder();
