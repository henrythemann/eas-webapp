import mapStyles from '/styles/map.module.css';

export default function MapSection () {
    return (
        <section className={mapStyles.mapContainer}>
            <iframe className={mapStyles.map} loading="lazy" src="https://maps.google.com/maps?q=European%20Auto%20Service%2C%20Reseda%20CA%2C%20United%20States&amp;t=m&amp;z=10&amp;output=embed&amp;iwloc=near" title="European Auto Service, Reseda CA, United States" aria-label="European Auto Service, Reseda CA, United States"></iframe>
        </section>
    )
}