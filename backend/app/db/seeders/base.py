class Seeder:
    name = None

    async def should_run(self, session):
        return True

    async def run(self, session):
        pass
