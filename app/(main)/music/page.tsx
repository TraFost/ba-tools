import { Link } from "components/ui/link";
import AlbumImage from "components/music/album-image";
import CarouselMusic from "components/music/carousel-music";
import StudentItem from "components/music/student/student-item";
import TrackItem from "components/music/track-item";
import { getAlbums } from "@/app/lib/fetcher/getAlbum";
import type { IAlbum } from "@/app/type/music-type";
import { artistName } from "@/app/config/music";
import { getSomeMusics } from "@/app/lib/fetcher/getMusic";
import { getSomeStudents } from "@/app/lib/fetcher/getStudent";

const MusicPage = async () => {
  const albums = await getAlbums();
  const musics = await getSomeMusics(5);
  const students = await getSomeStudents(12);

  return (
    <div className="flex flex-col gap-4">
      <section>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl lg:text-4xl font-bold">Artists</h2>
          <Link
            href="/music/artists"
            className="text-accent-foreground font-semibold text-lg hover:underline"
          >
            See all artists
          </Link>
        </div>
        <CarouselMusic albums={albums} />
      </section>
      <section>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl lg:text-4xl font-bold">Musics</h2>
          <Link
            href="/music/soundtrack"
            className="text-accent-foreground font-semibold text-lg hover:underline"
          >
            See all musics
          </Link>
        </div>
        {musics.map((music, index) => (
          <TrackItem key={music.id} musicList={musics} index={index} music={music} />
        ))}
      </section>
      <section>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl lg:text-4xl font-bold">Students</h2>
          <Link
            href="/music/students"
            className="text-accent-foreground font-semibold text-lg hover:underline"
          >
            See all students
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2 w-full">
          {students.map((student) => (
            <StudentItem key={student.id} student={student} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-2xl lg:text-4xl font-bold mb-2">other playlists</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 lg:gap-4">
          {albums.map(
            (album: IAlbum) =>
              !artistName.includes(album.title.toLowerCase()) && (
                <Link
                  href={`/music/${album.path}`}
                  key={album.id}
                  className="flex flex-col gap-2 hover:bg-primary/50 rounded-xl p-2 group transition-colors duration-200"
                  draggable={false}
                >
                  <AlbumImage
                    music={album.tracks}
                    src={
                      album.image
                        ? `https://jyxwxdxjdshypymisxeo.supabase.co/storage/v1/object/public/music/images/${album.image}`
                        : "/icon.png"
                    }
                    alt={album.title}
                    width={720}
                    height={720}
                    isVisible={false}
                  />
                  <div className="px-2 pb-2">
                    <p className="font-bold capitalize line-clamp-2">{album.title}</p>
                  </div>
                </Link>
              ),
          )}
        </div>
      </section>
    </div>
  );
};

export default MusicPage;
