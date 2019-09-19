export default class FetchService {
    async getResource(url) {
        const res = await fetch(url);
        if (!res.ok) {
        throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`)
        }
        return await res.json();
    }
    async getAllPeople() {
        const res = await this.getResource(`http://demo.sibers.com/users`);
        return res.map(this._transformPerson);
    }
    _transformPerson = (person) => {
        return {
        id: person.id,
        name: person.name,
        username: person.username,
        website: person.website,
        avatar: person.avatar
        }
    }
}